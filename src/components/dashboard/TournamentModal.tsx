import styles from './TournamentModal.module.scss';
import { useState } from 'react';
import { Modal, Button, Checkbox, Input, FileInput, Textarea, Icon } from '@/components/UI';
import { useAppDispatch } from '@/lib/hooks';
import { AdminTournament } from '@/types';
import { getTournamentBackgroundLink, getTournamentImageLink, getTournamentRulesLink } from '@/utils/uploadLink';
import { updateTournament } from '@/modules/admin';
import { IconName } from '@/components/UI/Icon';

/** The tournament modal */
const TournamentModal = ({
  tournament,
  onClose = undefined,
}: {
  /** The tournament or null if you want to create a new one */
  tournament: AdminTournament | null;
  /** The function to call when the user quits the modal */
  onClose?: () => void;
}) => {
  const dispatch = useAppDispatch();

  const id = tournament?.id || null;
  const [name, setName] = useState(tournament?.name || null);
  const [maxPlayers, setMaxPlayers] = useState(tournament?.maxPlayers || null);
  const [infos, setInfos] = useState(tournament?.infos || null);
  const [format, setFormat] = useState(tournament?.format || null);
  const [cashprize, setCashprize] = useState(tournament?.cashprize || null);
  const [cashprizeDetails, setCashprizeDetails] = useState(tournament?.cashprizeDetails || null);
  const [casters, setCasters] = useState<string[] | null>(
    tournament?.casters ? tournament?.casters?.map((caster) => caster.name) : null,
  );
  const [castersCount, setCastersCount] = useState((tournament?.casters && tournament?.casters!.length) || 0);
  const [display, setDisplay] = useState(tournament?.display || false);
  const [displayCasters, setDisplayCasters] = useState(tournament?.displayCasters || false);
  const [displayCashprize, setDisplayCashprize] = useState(tournament?.displayCashprize || false);
  const [image, setImage] = useState<File | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [rules, setRules] = useState<File | null>(null);

  return (
    <Modal
      visible={true}
      title="Tournoi"
      onCancel={onClose ? onClose : () => {}}
      buttons={
        <>
          <Button
            primary
            onClick={() => {
              const body = {
                id: id! ?? '',
                name: name ?? '',
                maxPlayers: maxPlayers ?? 0,
                lockedTeamsCount: 0,
                placesLeft: 0,
                infos: infos,
                format: format,
                cashprize: cashprize ?? 0,
                cashprizeDetails: cashprizeDetails,
                casters: casters ?? [],
                teams: [],
                display,
                displayCasters,
                displayCashprize,
              } as unknown as AdminTournament;

              dispatch(
                updateTournament(body, image, backgroundImage, rules, () => {
                  onClose!();
                }),
              );
            }}>
            Enregistrer
          </Button>
        </>
      }>
      <>
        <Input label="Nom" value={name ?? ''} onChange={setName} />
        <Input
          label="Nombre de joueurs maximum"
          type="number"
          value={maxPlayers ?? ''}
          onChange={(e) => setMaxPlayers(parseInt(e))}
        />
        <Input
          label="Nombre de joueurs par équipe"
          type="number"
          disabled={true}
          value={tournament?.playersPerTeam ?? ''}
        />
        <Input
          label="Nombre maximal de coachs par équipe"
          type="number"
          disabled={true}
          value={tournament?.coachesPerTeam ?? ''}
        />
        <Input label="Infos" value={infos ?? ''} onChange={setInfos} />
        <Textarea label="Format" value={format ?? ''} onChange={setFormat} />
        <Input label="Cashprize" type="number" value={cashprize ?? ''} onChange={(e) => setCashprize(parseInt(e))} />
        <Textarea label="Détails du cashprize" value={cashprizeDetails ?? ''} onChange={setCashprizeDetails} />

        <div className={styles.casters}>
          <p>Casters</p>
          <Button
            primary
            onClick={() => {
              setCastersCount(castersCount + 1);
            }}>
            Ajouter un caster
          </Button>
        </div>

        {Array.from(Array(castersCount).keys()).map((i) => (
          <div key={i} className={styles.caster}>
            <Input
              label={`Caster ${i + 1}`}
              value={casters![i] ?? ''}
              onChange={(e) => {
                const newCasters = [...casters!];
                newCasters[i] = e;
                setCasters(newCasters);
              }}
            />

            <Button
              primary
              onClick={() => {
                const newCasters = [...casters!];
                newCasters.splice(i, 1);
                setCasters(newCasters);
                setCastersCount(castersCount - 1);
              }}>
              <Icon name={IconName.Trash} className={styles.trashIcon} />
            </Button>
          </div>
        ))}
        <div className={styles.displayCheckboxes}>
          <Checkbox label="Display" value={display} onChange={setDisplay} />
          <Checkbox label="Display des casters" value={displayCasters} onChange={setDisplayCasters} />
          <Checkbox label="Display du cashprize" value={displayCashprize} onChange={setDisplayCashprize} />
        </div>

        <FileInput
          textColor="black"
          label="Image"
          value={tournament ? getTournamentImageLink(tournament.id) : ''}
          onChange={setImage}
          type={['jpg']}
        />
        <FileInput
          textColor="black"
          label="Image de fond"
          value={tournament ? getTournamentBackgroundLink(tournament.id) : ''}
          onChange={setBackgroundImage}
          type={['jpg']}
        />
        <FileInput
          textColor="black"
          label="Règles"
          value={tournament ? getTournamentRulesLink(tournament.id) : ''}
          onChange={setRules}
          type={['pdf']}
        />
      </>
    </Modal>
  );
};

export default TournamentModal;
