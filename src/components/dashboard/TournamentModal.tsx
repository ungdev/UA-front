import { useState } from 'react';
import { Modal, Button, Checkbox, Input, FileInput, Textarea } from '../UI';
import { useAppDispatch } from '@/lib/hooks';
import { AdminTournament } from '@/types';
import type { Action } from '@reduxjs/toolkit';
import { getTournamentBackgroundLink, getTournamentImageLink, getTournamentRulesLink } from '@/utils/uploadLink';
import { updateTournament } from '@/modules/admin';

const TournamentModal = ({
  tournament,
  onClose = undefined,
}: {
  tournament: AdminTournament | null;
  onClose?: () => void;
}) => {
  const dispatch = useAppDispatch();

  const id = useState(tournament?.id || null);
  const [name, setName] = useState(tournament?.name || null);
  const [maxPlayers, setMaxPlayers] = useState(tournament?.maxPlayers || null);
  const [playersPerTeam, setPlayersPerTeam] = useState(tournament?.playersPerTeam || null);
  const [infos, setInfos] = useState(tournament?.infos || null);
  const [format, setFormat] = useState(tournament?.format || null);
  const [cashprize, setCashprize] = useState(tournament?.cashprize || null);
  const [cashprizeDetails, setCashprizeDetails] = useState(tournament?.cashprizeDetails || null);
  // const [casters, setCasters] = useState(tournament?.casters || null);
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
          {/* {id && (
            <Button
              primary
              outline
              onClick={() => {
                dispatch(deleteTournament(id) as unknown as Action);
              }}></Button>
          )} */}

          <Button
            primary
            onClick={() => {
              const body = {
                id: id! ?? '',
                name: name ?? '',
                maxPlayers: maxPlayers ?? 0,
                playersPerTeam: playersPerTeam ?? 0,
                lockedTeamsCount: 0,
                placesLeft: 0,
                infos: infos,
                format: format,
                cashprize: cashprize ?? 0,
                cashprizeDetails: cashprizeDetails,
                // casters: casters ?? [],
                casters: [],
                teams: [],
                display,
                displayCasters,
                displayCashprize,
              } as unknown as AdminTournament;
              // dispatch(
              //   tournament == null
              //     ? (addTournament(body, logo) as unknown as Action)
              //     : (updateTournament(body, logo) as unknown as Action),
              // );
              dispatch(updateTournament(body, image, backgroundImage, rules) as unknown as Action);
            }}>
            Enregistrer
          </Button>
        </>
      }
      containerClassName="user-modal">
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
          value={playersPerTeam ?? ''}
          onChange={(e) => setPlayersPerTeam(parseInt(e))}
        />
        <Input label="Infos" value={infos ?? ''} onChange={setInfos} />
        <Textarea label="Format" value={format ?? ''} onChange={setFormat} />
        <Input label="Cashprize" type="number" value={cashprize ?? ''} onChange={(e) => setCashprize(parseInt(e))} />
        <Textarea label="Détails du cashprize" value={cashprizeDetails ?? ''} onChange={setCashprizeDetails} />
        {/* <Input label="Casters" value={casters ?? ''} onChange={setCasters} /> */}
        <Checkbox label="Display" value={display} onChange={setDisplay} />
        <Checkbox label="Display des casters" value={displayCasters} onChange={setDisplayCasters} />
        <Checkbox label="Display du cashprize" value={displayCashprize} onChange={setDisplayCashprize} />

        <FileInput
          label="Image"
          value={tournament ? getTournamentImageLink(tournament.id) : ''}
          onChange={setImage}
          type="jpg"
        />
        <FileInput
          label="Image de fond"
          value={tournament ? getTournamentBackgroundLink(tournament.id) : ''}
          onChange={setBackgroundImage}
          type="jpg"
        />
        <FileInput
          label="Règles"
          value={tournament ? getTournamentRulesLink(tournament.id) : ''}
          onChange={setRules}
          type="pdf"
        />
      </>
    </Modal>
  );
};

export default TournamentModal;
