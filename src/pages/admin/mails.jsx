import React, { useState } from 'react';
import { Button, RichTextArea, Input, Select, Checkbox } from '../../components/UI';

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
                  {lockedTeamRecipient === 'unlocked' && tournamentRecipient === 'all' && (
                    <> qui n'ont pas d'équipe ou</>
                  )}
                  {lockedTeamRecipient === 'all' || (
                    <> dont l'équipe {lockedTeamRecipient === 'locked' ? 'est' : "n'est pas"} verrouillée</>
                  )}
                  {lockedTeamRecipient === 'unlocked' && tournamentRecipient === 'all' && (
                    <> (cela inclut tous les spectateurs)</>
                  )}
                </>
              )}
            </span>
          </div>
        </div>
      </div>
      <RichTextArea onChange={setMail} label="Corps du mail">
        {mail}
      </RichTextArea>
      <Button leftIcon="fas fa-paper-plane" primary={true} onClick={() => {}}>
        Envoyer
      </Button>
    </div>
  );
};

export default Mails;
