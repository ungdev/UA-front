import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, RichTextArea, Input, Select, Checkbox } from '../../components/UI';
import { sendMail } from '../../modules/mails';

const tournamentRecipientOptions = [
  { label: 'Tous', value: 'all' },
  { label: 'LoL (compétitif)', value: 'lolCompetitive' },
  { label: 'LoL (loisir)', value: 'lolLeisure' },
  { label: 'Rocket League', value: 'rl' },
  { label: 'CS:GO', value: 'csgo' },
  { label: 'SSBU', value: 'ssbu' },
  { label: 'osu!', value: 'osu' },
  { label: 'Libre', value: 'open' },
];

const lockRecipientOptions = [
  { label: 'Tous', value: 'all' },
  { label: 'Equipes verrouillées', value: 'locked' },
  { label: 'Equipes non verrouillées', value: 'unlocked' },
];

const Mails = () => {
  const dispatch = useDispatch();
  const [subject, setSubject] = useState('');
  const [mail, setMail] = useState(
    <>
      <p>Hello World !</p>
      <p>
        This is <em>italic</em> style !
      </p>
    </>,
  );
  const [tournamentRecipient, setTournamentRecipient] = useState(tournamentRecipientOptions[0].value);
  const [lockedTeamRecipient, setLockedTeamRecipient] = useState(lockRecipientOptions[0].value);
  const [isPreview, setPreview] = useState(false);

  return (
    <div id="admin-mails">
      <Input label="Objet :" value={subject} onChange={setSubject}></Input>
      <div className="section">
        <div>Destinataires :</div>
        <div className="recipients">
          <div className="label">Tournoi&nbsp;:</div>
          <Select
            options={tournamentRecipientOptions}
            onChange={(value) => setTournamentRecipient(value)}
            value={tournamentRecipient}
            disabled={isPreview}
          />
          <div className="label">Equipe verrouillée&nbsp;:</div>
          <Select
            options={lockRecipientOptions}
            onChange={(value) => setLockedTeamRecipient(value)}
            value={lockedTeamRecipient}
            disabled={isPreview}
          />
          <div className="line">
            <Checkbox label="Est-ce un brouillon ?" value={isPreview} onChange={(value) => setPreview(value)} />
          </div>
          <div className="info line">
            <i className="fas fa-info-circle" />
            <span>
              {isPreview ? (
                <>Tu seras l'unique destinataire de ce mail</>
              ) : (
                <>
                  Ce mail sera envoyé à tous les utilisateurs
                  {tournamentRecipient === 'all' || (
                    <>
                      {' '}
                      du tournoi{' '}
                      {tournamentRecipientOptions.find((option) => option.value === tournamentRecipient).label}
                    </>
                  )}
                  {lockedTeamRecipient === 'all' || (
                    <> dont l'équipe {lockedTeamRecipient === 'locked' ? 'est' : "n'est pas"} verrouillée</>
                  )}
                </>
              )}
              {lockedTeamRecipient === 'all' && tournamentRecipient === 'all' && (
                <>
                  <br />
                  Les utilisateurs dont l'adresse mail n'a pas été vérifiée ne recevront pas ce mail.
                </>
              )}
            </span>
          </div>
        </div>
      </div>
      <RichTextArea onChange={setMail} label="Corps du mail">
        {mail}
      </RichTextArea>
      <Button
        leftIcon="fas fa-paper-plane"
        primary={true}
        onClick={() =>
          dispatch(
            sendMail({
              tournamentId: tournamentRecipient === 'all' ? null : tournamentRecipient,
              locked: lockedTeamRecipient === 'all' ? null : lockedTeamRecipient === 'locked',
              preview: isPreview,
              subject: subject,
              highlight: {
                intro: subject, // TODO: implement this
                title: subject, // TODO: implement this
              },
              reason: null, // TODO: implement this
              content: [
                // TODO: serialize content here
                {
                  title: 'Test section',
                  components: ['Test content !', 'This should appear as another paragraph'],
                },
              ],
            }),
          )
        }>
        Envoyer
      </Button>
    </div>
  );
};

export default Mails;
