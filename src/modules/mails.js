import { toast } from 'react-toastify';
import { API } from '../utils/api';

/**
 * A clickable (when not using windows xp as client user device) button
 * in the mail. A single button will be added with a line break. If you
 * want multiple buttons to be displayed on the same line, wrap them in
 * a list.
 *
 * When using buttons, it is highly recommended to add a plain text link
 * under the so-called buttons.
 *
 * @typedef MailButtonComponent
 * @property {string} name the text displayed in the button
 * @property {`https://${string}`} location the target location of the
 * button
 * @property {`#${string}`} [color] the color of the button (defaults to
 * `$primary-color`)
 */

/**
 * Yes ! Of course that you can add tables in mails (it used to be the
 * main component of mails after all - and it's still the case as all
 * these dumb mail clients don't want to evolve...)
 *
 * Example:
 * ```js
 * {
 *  name: "Table example",
 *  items: [
 *    {
 *      // This object will be considered as the header of the table,
 *      // registering two columns: `id` and `value`. The header will
 *      // have two cells, containing 'Identifier' and 'Value'
 *      'id': 'Identifier',
 *      'value': 'Value',
 *    },
 *    {
 *      // This is the first table item. It contains both of the
 *      // registered columns. It will create a new row, containing
 *      // two cells with their values in their respective columns.
 *      'id': '1',
 *      'value': 'First Element',
 *    },
 *    {
 *      // This is the second table item. It contains both of the
 *      // registered columns with an extra property. It will be
 *      // handled the same way as the previous example: the `extraData`
 *      // property is ignored as it doesn't appear in the header
 *      'id': '2',
 *      'value': 'Second Element',
 *      'extraData': 'some data here',
 *    },
 *    {
 *      // This is the third table item. It only contains one of the
 *      // registered columns. This column will have the corresponding
 *      // cell and the missing value will be rendered as an empty cell.
 *      'id': '3',
 *    },
 *  ]
 * }
 * ```
 *
 * @typedef MailTableComponent
 * @property {string} [name] the caption of the table
 * @property {{
 *    [column: string]: string;
 *  }[]} items contains all table rows, **INCLUDING** the header ! The table
 * header is the first element of this array. The properties of this header
 * will define the columns of the table so that the other elements of the array
 * are expected to have the same properties (ie. same keys) as the header.
 */

/**
 * @typedef MailSection
 * @property {string} title the title of the section. Will be displayed
 * with a bigger font size
 * @property {(
 *    string | string[] |
 *    MailButtonComponent | MailButtonComponent[] |
 *    MailTableComponent
 *  )[]} components the content of this section. All items of this array
 * will be added with a new line. In order to inline multiple buttons,
 * wrap them into an array (as specified {@link MailButtonComponent here}).
 * Whereas this works for {@link MailButtonComponent}, it won't work for
 * plain text (aka. strings) as an array of strings will be displayed as
 * a bullet point list.
 */

/**
 * A mail that can be sent by the api.
 * All texts are escaped (ie. html will break) and support these basic markup rules:
 * - \*text\* will be rendered as bold text
 * - \_text\_ will be rendered as italic text
 * - \n will be turned into a line break (&lt;br /&gt;)
 * - &amp;nbsp; will be kept as is
 *
 * @typedef Mail
 * @property {boolean} [locked] whether this mail should only be sent
 * to locked teams or to unlocked teams. When omitted, mail will reach all
 * users (but will still use other filters)
 * @property {string} [tournamentId] the tournament all recipients must be
 * part of (filters recipients per tournament). This filter will only target
 * `UserType#coach` and `UserType#player` (as the others are not part of teams
 * and a fortiori of tournaments)
 * @property {boolean} preview whether this mail is a preview (only the sender
 * will receive the mail). This can be used to test the layout of the mail before
 * sending it to users.
 * @property {string} subject the title of the mail. At the moment this property
 * will be displayed as the title and as the header of the mail. This will most
 * likely change in a near future.
 * @property {MailSection[]} content the sections of the mail. A section is a
 * part of the mail with a bigger title. They are separated by $accent-color
 * dotted lines.
 */

/**
 * @typedef SentMailProperties
 * @property {string} sentAt the time this mail was sent at (ISO 8601 format)
 * @property {{
 *  id: string;
 *  type: string;
 *  username: string;
 *  firstname: string;
 *  lastname: string;
 *  email: string;
 *  permissions: string[];
 * }} sender the sender of this mail
 *
 * @typedef {SentMailProperties & Mail} SentMail
 */

export const SET_MAILS = 'mails/SET_MAILS';

const initialState = {
  /** @type {SentMail[]} */
  mails: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MAILS:
      return {
        ...state,
        mails: action.mails,
      };
    default:
      return state;
  }
};

export const fetchMails = () => async (dispatch) => {
  const mails = await API.get('admin/emails');
  dispatch({
    type: SET_MAILS,
    mails,
  });
};

/**
 * Sends a mail to the api. See {@link Mail} for more details
 * about format.
 * @param {Mail} params the details/content of the mail
 */
export const sendMail =
  ({ locked, tournamentId, preview, subject, content }) =>
  async (dispatch) => {
    /** @type {Mail} */
    const mailBody = {
      content,
      subject,
      preview,
    };
    if (tournamentId) mailBody.tournamentId = tournamentId;
    if (typeof locked === 'boolean') mailBody.locked = locked;
    try {
      const { malformed, delivered, undelivered } = await API.post('admin/emails', mailBody);
      if (malformed)
        toast.error(`${malformed} mail${malformed > 1 ? 's' : ''} n'ont pas pu être envoyés (syntaxe invalide)`);
      if (undelivered)
        toast.warning(`${undelivered} mail${malformed > 1 ? 's' : ''} n'ont pas réussi à atteindre leur destination !`);
      if (delivered) {
        dispatch(() => fetchMails());
        toast.success(`${delivered} mail${malformed > 1 ? 's' : ''} ont bien été envoyés`);
      }
    } catch {}
  };
