import React, { useEffect, useState } from 'react';

import { setCaptain, acceptUser, kickUser, refuseUser, deleteTeam, fetchCurrentTeam, lockTeam } from '@/modules/team';

import { fetchSettings } from '@/modules/settings';
import { fetchSlots, fetchTournaments } from '@/modules/tournament';
import { Title, Table, Button, Modal, Helper, Icon } from '@/components/UI';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import type { Action } from '@reduxjs/toolkit';
import { TournamentWithTeams, UserType } from '@/types';

const playersColumns = [
  { title: 'Pseudo', key: 'username' },
  { title: 'A payé', key: 'hasPaid' },
  { title: '', key: 'action' },
];

const waitingPlayersColumns = [
  { title: 'Pseudo', key: 'username' },
  { title: '', key: 'action' },
];

const initialModal = { onOk: () => {}, visible: false, content: '', title: '' };

const Team = () => {
  const [modal, setModal] = useState(initialModal);
  const dispatch = useAppDispatch();
  const isShopAllowed = useAppSelector((state) => state.settings.shop);
  const { id, teamId } = useAppSelector((state) => state.login.user || { id: '', teamId: null });
  const team = useAppSelector((state) => state.team);
  const slotsTournament = useAppSelector((state) => state.tournament.slots);

  const isCaptain = team && team.captainId === id;
  const isSolo = team && team.name.includes('solo-team');
  const usersPaid = team && team.players.reduce((previous, player) => (player.hasPaid ? previous + 1 : previous), 0);
  const tournaments: TournamentWithTeams[] | null = useAppSelector((state) => state.tournament.tournaments);
  const tournament = team && tournaments && tournaments.filter((tournament) => tournament.id === team.tournamentId)[0];
  const tournamentName = tournament && tournament.name;

  useEffect(() => {
    isShopAllowed || dispatch(fetchSettings() as unknown as Action);
  }, []);

  useEffect(() => {
    if (!team && teamId) {
      dispatch(fetchCurrentTeam() as unknown as Action);
    } else {
      const interval = setInterval(() => dispatch(fetchCurrentTeam() as unknown as Action), 120000);
      return () => clearInterval(interval);
    }
  }, [team]);

  useEffect(() => {
    if (team && !slotsTournament) {
      dispatch(fetchSlots() as unknown as Action);
    }
  }, [team]);

  useEffect(() => {
    if (team && !tournaments) {
      dispatch(fetchTournaments() as unknown as Action);
    }
  }, [team]);

  const players =
    !isSolo &&
    team &&
    team.players.map((user) => ({
      username: (
        <>
          {user.username} {user.id === team.captainId ? <Icon name="crown" /> : ''}
        </>
      ),
      fullname: `${user.firstname} ${user.lastname}`,
      email: user.email,
      hasPaid: user.hasPaid ? <Icon name="tick" /> : <Icon name="cross" />,
      action:
        user.id !== team.captainId && isCaptain && isShopAllowed && !team.locked ? (
          <>
            <Button
              onClick={() =>
                setModal({
                  visible: true,
                  onOk: () => {
                    dispatch(setCaptain(user.id) as unknown as Action);
                    setModal(initialModal);
                  },
                  content: "Confirme le nouveau chef d'équipe",
                  title: "Changer de chef d'équipe",
                })
              }>
              Designer comme chef
            </Button>

            <Button
              onClick={() =>
                setModal({
                  visible: true,
                  onOk: () => {
                    dispatch(kickUser(user.id) as unknown as Action);
                    setModal(initialModal);
                  },
                  content: "Confirme l'exclusion du joueur",
                  title: 'Exclure un joueur',
                })
              }>
              Exclure
            </Button>
          </>
        ) : (
          ''
        ),
    }));

  const coaches =
    !isSolo &&
    team &&
    team.coaches.map((user) => ({
      username: (
        <>
          {user.username} {user.id === team.captainId ? <Icon name="crown" /> : ''}
        </>
      ),
      fullname: `${user.firstname} ${user.lastname}`,
      email: user.email,
      hasPaid: user.hasPaid ? <Icon name="tick" /> : <Icon name="cross" />,
      action:
        user.id !== team.captainId && isCaptain && isShopAllowed && !team.locked ? (
          <>
            <Button
              onClick={() =>
                setModal({
                  visible: true,
                  onOk: () => {
                    dispatch(setCaptain(user.id) as unknown as Action);
                    setModal(initialModal);
                  },
                  content: "Confirme le nouveau chef d'équipe",
                  title: "Changer de chef d'équipe",
                })
              }>
              Designer comme chef
            </Button>

            <Button
              onClick={() =>
                setModal({
                  visible: true,
                  onOk: () => {
                    dispatch(kickUser(user.id) as unknown as Action);
                    setModal(initialModal);
                  },
                  content: "Confirme l'exclusion du coach / manager",
                  title: 'Exclure un coach / manager',
                })
              }>
              Exclure
            </Button>
          </>
        ) : (
          ''
        ),
    }));

  const waitingPlayers =
    !isSolo &&
    team &&
    team.askingUsers
      .filter((u) => u.type === UserType.player)
      .map((user) => ({
        username: user.username,
        email: user.email,
        action:
          user.id !== team.captainId && isCaptain ? (
            <>
              <Button onClick={() => dispatch(acceptUser(user) as unknown as Action)} primary>
                Accepter
              </Button>
              <Button
                className="refuse-button"
                onClick={() =>
                  setModal({
                    visible: true,
                    onOk: () => {
                      dispatch(refuseUser(user) as unknown as Action);
                      setModal(initialModal);
                    },
                    content: `Veux-tu refuser ${user.username} ?`,
                    title: 'Refuser un joueur',
                  })
                }>
                Refuser
              </Button>
            </>
          ) : (
            ''
          ),
      }));

  const waitingCoaches =
    !isSolo &&
    team &&
    team.askingUsers
      .filter((u) => u.type === UserType.coach)
      .map((user) => ({
        username: user.username,
        email: user.email,
        action:
          user.id !== team.captainId && isCaptain ? (
            <>
              <Button onClick={() => dispatch(acceptUser(user) as unknown as Action)} primary>
                Accepter
              </Button>
              <Button
                onClick={() =>
                  setModal({
                    visible: true,
                    onOk: () => {
                      dispatch(refuseUser(user) as unknown as Action);
                      setModal(initialModal);
                    },
                    content: `Veux-tu refuser ${user.username} ?`,
                    title: 'Refuser un coach / manager',
                  })
                }>
                Refuser
              </Button>
            </>
          ) : (
            ''
          ),
      }));

  // This variable is unused
  // const diplayMatches =
  //   team &&
  //   team.matches &&
  //   team.matches.length &&
  //   team.matches.map(({ opponents, note, id }) => {
  //     const displayOpponents = opponents.map(({ name, result, rank }) => {
  //       return (
  //         <div key={name} className="opponent">
  //           <div>{name}</div>
  //           {result && <div className={result}>{result[0].toUpperCase()}</div>}
  //           {rank && <div className="circle">{rank}</div>}
  //         </div>
  //       );
  //     });
  //     return (
  //       <Card
  //         className="team-match"
  //         content={
  //           <>
  //             {displayOpponents}
  //             {note && <div className="divider" />}
  //             {note && <p className="match-note">Note : {note}</p>}
  //           </>
  //         }
  //         key={id}
  //       />
  //     );
  //   });

  if (!team) {
    return null;
  }

  return (
    <div id="dashboard-team">
      <div className="header">
        <div className="header-info">
          {!isSolo && (
            <div>
              <strong>Mon équipe :</strong> {team.name}
            </div>
          )}
          <div>
            <strong>Tournoi :</strong> {tournamentName}
          </div>
          {isShopAllowed && (
            <>
              <div>
                <strong>Statut</strong>{' '}
                <Helper>
                  Pour être inscrite, une équipe doit être complète, tous les membres de l'équipe doivent avoir payé
                  leur place et l'équipe doit être verrouillée.
                </Helper>
                <strong> : </strong>
                {team.locked ? (
                  <>
                    <Icon name="tick" /> Inscrit
                  </>
                ) : (
                  <>
                    <Icon name="caution" /> Non inscrit
                  </>
                )}
              </div>
              {slotsTournament && (
                <div>
                  <strong> {isSolo ? 'Places' : 'Equipes'} disponibles :</strong>{' '}
                  {slotsTournament[team.tournamentId].available} / {slotsTournament[team.tournamentId].total}
                </div>
              )}
            </>
          )}
        </div>
        <div onClick={() => document.location.reload()}>
          <Icon name="refresh" />
        </div>
      </div>

      {/* {team.lastInfo ? (
        <div className="info">
          <Title level={4}>{team.lastInfo.title}</Title>
          <p>{team.lastInfo.content}</p>
        </div>
      ) : (
        <hr />
      )} */}

      {/* TODO : fix this */}
      {/* {team.matches.length ? (
        <>
          <Title level={4}>Mes matchs</Title>
          <div className="team-matches">{diplayMatches}</div>
          <hr />
        </>
      ) : (
        ''
      )} */}

      {/* {team.toornamentId && (
        <>
          <Title level={4}>Arbre du tournoi</Title>
          <iframe
            width="100%"
            height="500"
            src={`https://widget.toornament.com/tournaments/${team.tournament.toornamentId}/stages/${team.lastStage}/?_locale=fr`}
            allowFullScreen
            frameBorder="0"
          />
          <hr />
        </>
      )} */}

      {!isSolo ? (
        <>
          <div className="players-list">
            <Title level={4}>Joueurs</Title>
            <Table columns={playersColumns} dataSource={players ? players : []} alignRight className="table-players" />
          </div>
          <div className="players-list">
            <Title level={4}>Coach / Manager</Title>
            <Table columns={playersColumns} dataSource={coaches ? coaches : []} alignRight className="table-players" />
          </div>
          {isCaptain && !team.locked && (
            <Button
              primary
              disabled={!(tournament && usersPaid === tournament.playersPerTeam)}
              onClick={() => dispatch(lockTeam() as unknown as Action)}>
              Verrouiller l'équipe
            </Button>
          )}
          {isShopAllowed && !team.locked && (
            <>
              <div className="players-list">
                <Title level={4}>Joueurs en attente</Title>
                <Table
                  columns={waitingPlayersColumns}
                  dataSource={waitingPlayers ? waitingPlayers : []}
                  alignRight
                  className="table-players"
                />
              </div>
              <div className="players-list">
                <Title level={4}>Coach / Manager en attente</Title>
                <Table
                  columns={waitingPlayersColumns}
                  dataSource={waitingCoaches ? waitingCoaches : []}
                  alignRight
                  className="table-players"
                />
              </div>
              <Button
                onClick={() =>
                  isCaptain
                    ? setModal({
                        visible: true,
                        onOk: () => {
                          dispatch(deleteTeam() as unknown as Action);
                          setModal(initialModal);
                        },
                        content: "Es-tu sûr de vouloir dissoudre l'équipe ?",
                        title: "Dissoudre l'équipe",
                      })
                    : setModal({
                        visible: true,
                        onOk: () => {
                          dispatch(kickUser(id) as unknown as Action);
                          setModal(initialModal);
                        },
                        content: "Es-tu sûr de vouloir quitter l'équipe ?",
                        title: "Quitter l'équipe",
                      })
                }>
                {isCaptain ? "Dissoudre l'équipe" : "Quitter l'équipe"}
              </Button>
            </>
          )}
        </>
      ) : (
        !team.locked && (
          <>
            <Button primary disabled={!usersPaid} onClick={() => dispatch(lockTeam() as unknown as Action)}>
              Verrouiller mon inscription
            </Button>
            <Button
              onClick={() =>
                setModal({
                  visible: true,
                  onOk: () => {
                    dispatch(deleteTeam() as unknown as Action);
                    setModal(initialModal);
                  },
                  content: 'Es-tu sûr de vouloir quitter le tournoi ?',
                  title: 'Quitter le tournoi',
                })
              }>
              Quitter le tournoi
            </Button>
          </>
        )
      )}
      <Modal
        onOk={modal.onOk}
        onCancel={() => setModal({ ...initialModal, visible: false })}
        visible={modal.visible}
        title={modal.title}>
        {modal.content}
      </Modal>
    </div>
  );
};

export default Team;
