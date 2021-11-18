import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  setCaptain,
  acceptUser,
  kickUser,
  refuseUser,
  deleteTeam,
  fetchCurrentTeam,
  lockTeam,
} from '../../modules/team';

import { fetchSettings } from '../../modules/settings';
import tournament, { fetchSlots, fetchTournaments } from '../../modules/tournament';
import { Title, Table, Button, Modal, Helper, Card } from '../../components/UI';

const playersColumns = [
  { title: 'Pseudo', key: 'username' },
  { title: <>A&nbsp;payé</>, key: 'hasPaid' },
  { title: '', key: 'action' },
];

const waitingPlayersColumns = [
  { title: 'Pseudo', key: 'username' },
  { title: '', key: 'action' },
];

const initialModal = { onOk: () => {}, visible: false, content: '', title: '' };

const Team = () => {
  const [modal, setModal] = useState(initialModal);
  const dispatch = useDispatch();
  const isShopAllowed = useSelector((state) => state.settings.shop);
  const { id, teamId } = useSelector((state) => state.login.user || { id: '', teamId: null });
  const team = useSelector((state) => state.team);
  const slotsTournament = useSelector((state) => state.tournament.slots);

  const isCaptain = team && team.captainId === id;
  const isSolo = team && team.name.includes('solo-team');
  const usersPaid = team && team.players.reduce((previous, player) => (player.hasPaid ? previous + 1 : previous), 0);
  const tournaments = useSelector((state) => state.tournament.tournaments);
  const tournament = team && tournaments && tournaments.filter((tournament) => tournament.id === team.tournamentId)[0];
  const tournamentName = tournament && tournament.name;

  useEffect(() => {
    isShopAllowed || dispatch(fetchSettings());
  }, []);

  useEffect(() => {
    if (!team && teamId) {
      dispatch(fetchCurrentTeam());
    } else {
      let interval = setInterval(() => dispatch(fetchCurrentTeam()), 120000);
      return () => clearInterval(interval);
    }
  }, [team]);

  useEffect(() => {
    if (team && !slotsTournament) {
      dispatch(fetchSlots());
    }
  }, [team]);

  useEffect(() => {
    if (team && !tournaments) {
      dispatch(fetchTournaments());
    }
  }, [team]);

  const players =
    !isSolo &&
    team &&
    team.players.map((user) => ({
      username: (
        <>
          {user.username} {user.id === team.captainId ? <i className="fas fa-crown gold-icon" /> : ''}
        </>
      ),
      fullname: `${user.firstname} ${user.lastname}`,
      email: user.email,
      hasPaid: user.hasPaid ? <i className="fas fa-check green-icon" /> : <i className="fas fa-times red-icon" />,
      action:
        user.id !== team.captainId && isCaptain && isShopAllowed && !team.lockedAt ? (
          <>
            <Button
              onClick={() =>
                setModal({
                  visible: true,
                  onOk: () => {
                    dispatch(setCaptain(user.id, team.id));
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
                    dispatch(kickUser(user.id, team.id));
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
          {user.username} {user.id === team.captainId ? <i className="fas fa-crown gold-icon" /> : ''}
        </>
      ),
      fullname: `${user.firstname} ${user.lastname}`,
      email: user.email,
      hasPaid: user.hasPaid ? <i className="fas fa-check green-icon" /> : <i className="fas fa-times red-icon" />,
      action:
        user.id !== team.captainId && isCaptain && isShopAllowed && !team.lockedAt ? (
          <>
            <Button
              onClick={() =>
                setModal({
                  visible: true,
                  onOk: () => {
                    dispatch(setCaptain(user.id, team.id));
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
                    dispatch(kickUser(user.id, team.id));
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
      .filter((u) => u.type === 'player')
      .map((user) => ({
        username: user.username,
        email: user.email,
        action:
          user.id !== team.captainId && isCaptain ? (
            <>
              <Button onClick={() => dispatch(acceptUser(user, team.id))} primary>
                Accepter
              </Button>
              <Button
                className="refuse-button"
                onClick={() =>
                  setModal({
                    visible: true,
                    onOk: () => {
                      dispatch(refuseUser(user, team.id));
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
      .filter((u) => u.type === 'coach')
      .map((user) => ({
        username: user.username,
        email: user.email,
        action:
          user.id !== team.captainId && isCaptain ? (
            <>
              <Button onClick={() => dispatch(acceptUser(user, team.id))} primary>
                Accepter
              </Button>
              <Button
                onClick={() =>
                  setModal({
                    visible: true,
                    onOk: () => {
                      dispatch(refuseUser(user, team.id));
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

  const diplayMatches =
    team &&
    team.matches &&
    team.matches.length &&
    team.matches.map(({ opponents, note, id }) => {
      const displayOpponents = opponents.map(({ name, result, rank }) => {
        return (
          <div key={name} className="opponent">
            <div>{name}</div>
            {result && <div className={result}>{result[0].toUpperCase()}</div>}
            {rank && <div className="circle">{rank}</div>}
          </div>
        );
      });
      return (
        <Card
          className="team-match"
          content={
            <>
              {displayOpponents}
              {note && <div className="divider" />}
              {note && <p className="match-note">Note : {note}</p>}
            </>
          }
          key={id}
        />
      );
    });

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
                {team.lockedAt ? (
                  <>
                    <i className="fas fa-check-circle green-icon"></i> Inscrit
                  </>
                ) : (
                  <>
                    <i className="fas fa-exclamation-triangle red-icon"></i> Non inscrit
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
        <i className="fas fa-sync-alt refresh" onClick={() => document.location.reload()} />
      </div>

      {team.lastInfo ? (
        <div className="info">
          <Title level={4}>{team.lastInfo.title}</Title>
          <p>{team.lastInfo.content}</p>
        </div>
      ) : (
        <hr />
      )}

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

      {team.toornamentId && (
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
      )}

      {!isSolo ? (
        <>
          <div className="players-list">
            <Title level={4}>Joueurs</Title>
            <Table columns={playersColumns} dataSource={players} alignRight className="table-players" />
          </div>
          <div className="players-list">
            <Title level={4}>Coach / Manager</Title>
            <Table columns={playersColumns} dataSource={coaches} alignRight className="table-players" />
          </div>
          {isCaptain && !team.lockedAt && (
            <Button
              primary
              disabled={!(tournament && usersPaid === tournament.playersPerTeam)}
              onClick={() => dispatch(lockTeam())}>
              Verrouiller l'équipe
            </Button>
          )}
          {isShopAllowed && !team.lockedAt && (
            <>
              <div className="players-list">
                <Title level={4}>Joueurs en attente</Title>
                <Table
                  columns={waitingPlayersColumns}
                  dataSource={waitingPlayers}
                  alignRight
                  className="table-players"
                />
              </div>
              <div className="players-list">
                <Title level={4}>Coach / Manager en attente</Title>
                <Table
                  columns={waitingPlayersColumns}
                  dataSource={waitingCoaches}
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
                          dispatch(deleteTeam(team.id));
                          setModal(initialModal);
                        },
                        content: "Es-tu sûr de vouloir dissoudre l'équipe ?",
                        title: "Dissoudre l'équipe",
                      })
                    : setModal({
                        visible: true,
                        onOk: () => {
                          dispatch(kickUser(id, team.id));
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
        !team.lockedAt && (
          <>
            <Button primary disabled={!usersPaid} onClick={() => dispatch(lockTeam())}>
              Verrouiller mon inscription
            </Button>
            <Button
              onClick={() =>
                setModal({
                  visible: true,
                  onOk: () => {
                    dispatch(deleteTeam(team.id));
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
