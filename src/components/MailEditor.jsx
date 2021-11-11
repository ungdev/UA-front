import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { RichTextArea } from './UI';

const initialMail = {
  title: null,
  intro: null,
  highlight: null,
  reason: null,
  sections: [],
};

const INSERT_SECTION = 'insertSection';
const REMOVE_SECTION = 'removeSection';
const UPDATE_SECTION = 'updateSection';
const SET_TITLE = 'setTitle';
const SET_INTRO = 'setIntro';
const SET_HIGHLIGHT = 'setHighlight';
const SET_REASON = 'setReason';

const reducer = (state, action) => {
  switch (action.type) {
    case INSERT_SECTION:
      let key = 0;
      while (state.sections.some((section) => section.key === key)) key++;
      state.sections.splice(action.index, 0, {
        title: null,
        components: [],
        key,
      });
      return {
        ...state,
        sections: [...state.sections],
      };
    case REMOVE_SECTION:
      state.sections.splice(
        state.sections.findIndex((section) => section.key === action.key),
        1,
      );
      return {
        ...state,
        sections: [...state.sections],
      };
    case UPDATE_SECTION:
      const existing = state.sections.find((section) => section.key === action.key);
      if (action.title) existing.title = action.title.join('\n');
      if (action.components) existing.components = action.components;
      return {
        ...state,
        sections: [...state.sections],
      };
    case SET_TITLE:
      return {
        ...state,
        title: action.title.join('\n'),
      };
    case SET_INTRO:
      return {
        ...state,
        intro: action.intro.join('\n'),
      };
    case SET_HIGHLIGHT:
      return {
        ...state,
        highlight: action.highlight.join('\n'),
      };
    case SET_REASON:
      return {
        ...state,
        reason: action.reason.join('\n'),
      };
  }
  return state;
};

const MailEditor = ({ onChange }) => {
  /**
   * @type {[{
   *  title: string;
   *  intro: string;
   *  highlight: string;
   *  reason: string;
   *  sections: {
   *    key: number;
   *    title: string;
   *    components: string[];
   *  }[]
   * }, React.Dispatch<{
   *  type: 'insertSection';
   *  index: number;
   * } | {
   *  type: 'removeSection';
   *  key: number;
   * } | {
   *  type: 'updateSection';
   *  title?: string[];
   *  components?: string[];
   *  key: number;
   * } | {
   *  type: 'setTitle',
   *  title: string[];
   * } | {
   *  type: 'setIntro',
   *  intro: string[];
   * } | {
   *  type: 'setHighlight',
   *  highlight: string[];
   * } | {
   *  type: 'setReason',
   *  reason: string[];
   * }>]}
   */
  const [{ title, reason, highlight, intro, sections }, dispatch] = useReducer(reducer, initialMail);

  const serializeMail = (node, content) => {
    let raw = content.join('');
    switch (node.type) {
      case 'text':
        return node.children;
      case 'bold':
        raw = `*${raw}*`;
        break;
      case 'italic':
        raw = `_${raw}_`;
        break;
      case 'undefined':
        return '';
    }
    return raw;
  };

  const deserializeMail = (source) => {
    if (Array.isArray(source))
      return source.map((sourceElement) => [
        {
          type: 'container',
          textLength: 0,
          children: [],
        },
        sourceElement,
      ]);

    let children = [];
    const exp = /(?<delimiter>[*_])(.*?)\k<delimiter>/gs;
    let result;
    let cursor = 0;
    while ((result = exp.exec(source))) {
      if (result.index > cursor)
        children.push([
          {
            textLength: result.index - cursor,
            type: 'text',
            children: source.substring(cursor, result.index),
          },
        ]);
      children.push([
        {
          textLength: 0,
          type: result[1] === '*' ? 'bold' : result[1] === '_' ? 'italic' : 'undefined',
          children: [],
        },
        result[2],
      ]);
      cursor = result.index + result[0].length;
    }
    if (source.length > cursor)
      children.push([
        {
          textLength: source.length - cursor,
          type: 'text',
          children: source.substring(cursor),
        },
      ]);
    return children;
  };

  useEffect(() => {
    onChange({
      title,
      reason,
      highlight,
      intro,
      sections,
    });
  }, [title, reason, highlight, intro, sections]);

  return (
    <div className="mail-template">
      <table>
        <tbody>
          <tr>
            <td>
              <img src="https://arena.utt.fr/logo.png" alt="Logo UTT Arena" title="Logo UTT Arena" width="140" />
            </td>
            <td>
              <RichTextArea
                placeholder="Titre du mail"
                discreet={true}
                onChange={(title) => {
                  dispatch({
                    type: SET_TITLE,
                    title,
                  });
                }}
                serializer={serializeMail}
                deserializer={deserializeMail}
                initialValue={title?.split('\n')}
                className="size-medium"
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <table>
                <tbody>
                  <tr className="section">
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <RichTextArea
                                placeholder="Une introduction ici"
                                discreet={true}
                                onChange={(intro) =>
                                  dispatch({
                                    type: SET_INTRO,
                                    intro,
                                  })
                                }
                                serializer={serializeMail}
                                deserializer={deserializeMail}
                                initialValue={intro?.split('\n')}
                                className="size-full centered"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <RichTextArea
                                placeholder="Highlight ici"
                                discreet={true}
                                onChange={(highlight) =>
                                  dispatch({
                                    type: SET_HIGHLIGHT,
                                    highlight,
                                  })
                                }
                                serializer={serializeMail}
                                deserializer={deserializeMail}
                                initialValue={highlight?.split('\n')}
                                className="size-full centered"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td className="separator">
                      <div
                        className="insert"
                        onClick={() =>
                          dispatch({
                            type: INSERT_SECTION,
                            index: 0,
                          })
                        }>
                        <i className="fas fa-plus" />
                      </div>
                    </td>
                  </tr>
                  {sections.map((section, index) => (
                    <>
                      <tr key={`content-${section.key}`} className="section">
                        <td>
                          <div
                            className="delete"
                            onClick={() =>
                              dispatch({
                                type: REMOVE_SECTION,
                                key: section.key,
                              })
                            }>
                            <i className="fas fa-trash" />
                          </div>
                          <table>
                            <tbody>
                              <tr>
                                <td className="title">
                                  <RichTextArea
                                    placeholder="Titre de la section"
                                    discreet={true}
                                    onChange={(title) =>
                                      dispatch({
                                        type: UPDATE_SECTION,
                                        key: section.key,
                                        title,
                                      })
                                    }
                                    serializer={serializeMail}
                                    deserializer={deserializeMail}
                                    initialValue={section.title?.split('\n')}
                                    className="size-full"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className="text">
                                  <RichTextArea
                                    placeholder="Contenu de la section"
                                    discreet={true}
                                    onChange={(value) =>
                                      dispatch({
                                        type: UPDATE_SECTION,
                                        key: section.key,
                                        components: value,
                                      })
                                    }
                                    serializer={serializeMail}
                                    deserializer={deserializeMail}
                                    initialValue={section.components}
                                    className="size-full"
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr key={`separator-${section.key}`}>
                        <td className="separator">
                          <div
                            className="insert"
                            onClick={() =>
                              dispatch({
                                type: INSERT_SECTION,
                                index: index + 1,
                              })
                            }>
                            <i className="fas fa-plus" />
                          </div>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="footer">
              <table>
                <tbody>
                  <tr>
                    <td colSpan="6" className="section">
                      Suis-nous sur les réseaux sociaux pour suivre les infos en temps réel pendant l'événement&nbsp;!
                    </td>
                  </tr>
                  <tr>
                    <td className="socials">
                      <i className="fab fa-facebook" />
                    </td>
                    <td className="socials">
                      <i className="fab fa-twitter" />
                    </td>
                    <td className="socials">
                      <i className="fab fa-instagram" />
                    </td>
                    <td className="socials">
                      <i className="fab fa-youtube" />
                    </td>
                    <td className="socials">
                      <i className="fab fa-twitch" />
                    </td>
                    <td className="socials">
                      <i className="fab fa-discord" />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="6" className="section">
                      Ce mail a été envoyé à arena@utt.fr
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="6" className="section">
                      <RichTextArea
                        placeholder="Raison de l'envoi du mail (facultatif)"
                        discreet={true}
                        onChange={(reason) =>
                          dispatch({
                            type: SET_REASON,
                            reason,
                          })
                        }
                        serializer={serializeMail}
                        deserializer={deserializeMail}
                        initialValue={reason?.split('\n')}
                        className="size-full"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="6" className="section">
                      © {new Date().getFullYear()}&nbsp;
                      <span className="link">UTT Net Group</span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="6" className="section">
                      12 rue Marie Curie, 10000 Troyes
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

MailEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default MailEditor;
