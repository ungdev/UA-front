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
  const usersPaid = team && team.users.reduce((previous, user) => user.isPaid ? previous + 1 : previous, 0);

  useEffect(() => {
    if (userTeam && userTeam.id) {
      dispatch(fetchTeam(userTeam.id));
    }
  }, [userTeam]);

  useEffect(() => {
    if (team && !slotsTournament) {
      dispatch(fetchSlots());
    }
  }, [team]);

  const players = !isSolo && team && team.users.map((user) => ({
    username: <>{user.username} {user.id === team.captainId ? <i className="fas fa-crown gold-icon" /> : ''}</>,
    fullname: `${user.firstname} ${user.lastname}`,
    email: user.email,
    isPaid: user.isPaid ? <i className="fas fa-check green-icon" /> : <i className="fas fa-times red-icon" />,
    action: user.id !== team.captainId && isCaptain ? (
      <>
        <Button
          onClick={() => setModal({
            visible: true,
            onOk: () => {
              dispatch(setCaptain(user.id, team.id));
              setModal(initialModal);
            },
            content: 'Confirmez le nouveau chef d\'équipe',
            title: 'Changer de chef d\'équipe',
          })}
        >
          Designer comme chef
        </Button>

        <Button
          onClick={() => setModal({
            visible: true,
            onOk: () => {
              dispatch(kickUser(user.id, team.id));
              setModal(initialModal);
            },
            content: 'Confirmez l\'exclusion du joueur',
            title: 'Exclure un joueur',
          })}
        >
          Exclure
        </Button>
      </>
    ) : '',
  }));

  const waitingPlayers = !isSolo && team && team.askingUsers.map((user) => ({
    username: user.username,
    email: user.email,
    action: user.id !== team.captainId && isCaptain ? (
    <>
      <Button
        onClick={() => dispatch(acceptUser(user, team.id))}
        primary
      >
        Accepter
      </Button>
      <Button
        onClick={() => setModal({
          visible: true,
          onOk: () => {
            dispatch(refuseUser(user, team.id));
            setModal(initialModal);
          },
          content: `Voulez-vous refuser ${user.username} ?`,
          title: 'Refuser un joueur',
        })}
      >
        Refuser
      </Button>
    </>) : '',
  }));

  const diplayMatches = team && team.matches.length && team.matches.map(({ opponents, note, id }) => {
    return (
      <Card
        content={
          <>
            { opponents.map(({ name }) => <p key={name}>{name}</p>)}
            <p>Note: {note}</p>
          </>
        }
        className="team-match"
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
        {!isSolo && <div><strong>Mon équipe :</strong> {team.name}</div>}
        <div><strong>Tournoi :</strong> {team.tournament.name}</div>
        <div>
          <strong>Statut</strong> <Helper>Pour être inscrite, une équipe doit être complète et tous les membres de l'équipe doivent avoir payé leur place.</Helper>
          <strong> : </strong>
          {usersPaid === team.tournament.playersPerTeam
            ? <><i className="fas fa-check-circle green-icon"></i> Inscrit</>
            : <><i className="fas fa-exclamation-triangle red-icon"></i> Non inscrit</>
          }
        </div>
        { slotsTournament &&
        <div>
          <strong> Places disponibles :</strong> {slotsTournament[team.tournament.id].available} / {slotsTournament[team.tournament.id].total}
        </div>
        }
      </div>

      { team.matches.length &&
        <div className="team-matches">
          { diplayMatches }
        </div>
      }

      {!isSolo ? (
        <>
          <div className="players-list">
            <Title level={4}>Joueurs</Title>
            <Table columns={playersColumns} dataSource={players} alignRight className="table-players"/>
          </div>
          <div className="players-list">
            <Title level={4}>Joueurs en attente</Title>
            <Table columns={waitingPlayersColumns} dataSource={waitingPlayers} alignRight className="table-players"/>
          </div>
          <Button
            onClick={() => isCaptain ?
              setModal({
                visible: true,
                onOk: () => {
                  dispatch(deleteTeam(team.id));
                  setModal(initialModal);
                },
                content: 'Êtes-vous sûr de vouloir dissoudre l\'équipe ?',
                title: 'Dissoudre l\'équipe',
              }) :
              setModal({
                visible: true,
                onOk: () => {
                  dispatch(kickUser(id, team.id));
                  setModal(initialModal);
                },
                content: 'Êtes-vous sûr de vouloir quitter l\'équipe ?',
                title: 'Quitter l\'équipe',
              })
            }
          >
            {isCaptain ? 'Dissoudre l\'équipe' : 'Quitter l\'équipe'}
          </Button>
        </>
      ) : (
        <>
          <Button onClick={() =>
            setModal({
              visible: true,
              onOk: () => {
                dispatch(deleteTeam(team.id));
                setModal(initialModal);
              },
              content: 'Êtes-vous sûr de vouloir quitter le tournoi ?',
              title: 'Quitter le tournoi',
            })}
          >
            Quitter le tournoi
          </Button>
        </>
      )}
      <Modal
        onOk={modal.onOk}
        onCancel={() => setModal({ ...initialModal, visible: false })}
        visible={modal.visible}
        title={modal.title}
      >
        {modal.content}
      </Modal>
    </div>
  );
};

export default Team;
