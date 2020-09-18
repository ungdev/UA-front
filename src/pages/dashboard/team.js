import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchTeam, setCaptain, acceptUser, kickUser, refuseUser, deleteTeam } from '../../modules/team';
import { fetchSlots } from '../../modules/tournament';
import { Title, Table, Button, Modal, Helper, Card } from '../../components/UI';

import './team.css';

const playersColumns = [
  { title: 'Pseudo', key: 'username' },
  { title: 'Email', key: 'email' },
  { title: <>A&nbsp;payé</>, key: 'isPaid' },
  { title: '', key: 'action' },
];

const waitingPlayersColumns = [
  { title: 'Pseudo', key: 'username' },
  { title: 'Email', key: 'email' },
  { title: '', key: 'action' },
];

const initialModal = { onOk: () => {}, visible: false, content: '', title: '' };

const Team = () => {
  const [modal, setModal] = useState(initialModal);
  const dispatch = useDispatch();
  const { id, team: userTeam } = useSelector((state) => state.login.user || { id: '', team: '' });
  const { team } = useSelector((state) => state.team);
  const slotsTournament = useSelector((state) => state.tournament.slots);

  const isCaptain = team && team.captainId === id;
  const isSolo = team && team.name.includes('solo-team');
  const usersPaid = team && team.users.reduce((previous, user) => (user.isPaid ? previous + 1 : previous), 0);

  useEffect(() => {
    if (userTeam && userTeam.id) {
      dispatch(fetchTeam(userTeam.id));
      let interval = setInterval(() => dispatch(fetchTeam(userTeam.id)), 120000);
      return () => clearInterval(interval);
    }
  }, [userTeam]);

  useEffect(() => {
    if (team && !slotsTournament) {
      dispatch(fetchSlots());
    }
  }, [team]);

  const players =
    !isSolo &&
    team &&
    team.users.map((user) => ({
      username: (
        <>
          {user.username} {user.id === team.captainId ? <i className="fas fa-crown gold-icon" /> : ''}
        </>
      ),
      fullname: `${user.firstname} ${user.lastname}`,
      email: user.email,
      isPaid: user.isPaid ? <i className="fas fa-check green-icon" /> : <i className="fas fa-times red-icon" />,
      action:
        user.id !== team.captainId && isCaptain && process.env.EVENT_RUNNING !== 'true' ? (
          <>
            <Button
              onClick={() =>
                setModal({
                  visible: true,
                  onOk: () => {
                    dispatch(setCaptain(user.id, team.id));
                    setModal(initialModal);
                  },
                  content: "Confirmez le nouveau chef d'équipe",
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
                  content: "Confirmez l'exclusion du joueur",
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

  const waitingPlayers =
    !isSolo &&
    team &&
    team.askingUsers.map((user) => ({
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
                  content: `Voulez-vous refuser ${user.username} ?`,
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
            <strong>Tournoi :</strong> {team.tournament.name}
          </div>
          {process.env.EVENT_RUNNING !== 'true' && (
            <>
              <div>
                <strong>Statut</strong>{' '}
                <Helper>
                  Pour être inscrite, une équipe doit être complète et tous les membres de l'équipe doivent avoir payé
                  leur place.
                </Helper>
                <strong> : </strong>
                {usersPaid === team.tournament.playersPerTeam ? (
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
                  <strong> Places disponibles :</strong> {slotsTournament[team.tournament.id].available} /{' '}
                  {slotsTournament[team.tournament.id].total}
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

      {team.matches.length ? (
        <>
          <Title level={4}>Mes matchs</Title>
          <div className="team-matches">{diplayMatches}</div>
          <hr />
        </>
      ) : (
        ''
      )}

      {team.toornamentId && (
        <>
          <Title level={4}>Arbre du tournoi</Title>
          <iframe
            width="100%"
            height="500"
            src={`https://widget.toornament.com/tournaments/${team.tournament.toornamentId}/stages/${team.lastStage}/?_locale=fr`}
            allowFullscreen
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
          {process.env.EVENT_RUNNING !== 'true' && (
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
              <Button
                onClick={() =>
                  isCaptain
                    ? setModal({
                        visible: true,
                        onOk: () => {
                          dispatch(deleteTeam(team.id));
                          setModal(initialModal);
                        },
                        content: "Êtes-vous sûr de vouloir dissoudre l'équipe ?",
                        title: "Dissoudre l'équipe",
                      })
                    : setModal({
                        visible: true,
                        onOk: () => {
                          dispatch(kickUser(id, team.id));
                          setModal(initialModal);
                        },
                        content: "Êtes-vous sûr de vouloir quitter l'équipe ?",
                        title: "Quitter l'équipe",
                      })
                }>
                {isCaptain ? "Dissoudre l'équipe" : "Quitter l'équipe"}
              </Button>
            </>
          )}
        </>
      ) : (
        <>
          <Button
            onClick={() =>
              setModal({
                visible: true,
                onOk: () => {
                  dispatch(deleteTeam(team.id));
                  setModal(initialModal);
                },
                content: 'Êtes-vous sûr de vouloir quitter le tournoi ?',
                title: 'Quitter le tournoi',
              })
            }>
            Quitter le tournoi
          </Button>
        </>
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
