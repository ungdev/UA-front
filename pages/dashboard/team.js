import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { fetchTeam, setCaptain, acceptUser, kickUser, refuseUser, deleteTeam } from '../../modules/team';
import { Title, Table, Button, Modal } from '../../components/UI';

import './team.css';

const columns = [
  { title: 'Pseudo', key: 'username' },
  { title: 'Nom', key: 'fullname' },
  { title: 'Email', key: 'email' },
  { title: '', key: 'action' },
];

const initialModal = { onOk: () => {}, visible: false, content: '', title: '' };

const Team = () => {
  const [modal, setModal] = useState(initialModal);
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { id, team: userTeam } = useSelector((state) => state.login.user || { id: '', team: '' });
  const { team } = useSelector((state) => state.team);

  const isCaptain = team && team.captainId === id;
  const isSolo = team && team.name.includes('solo-team');

  useEffect(() => {
    if (userTeam && userTeam.id) {
      dispatch(fetchTeam(userTeam.id));
    }
  }, [userTeam]);

  const players = !isSolo && team && team.users.map((user) => {
    return ({
      username: user.id === team.captainId ? `${user.username} 🜲`: user.username,
      fullname: `${user.firstname} ${user.lastname}`,
      email: user.email,
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
      </>) : '',
    });
  });

  const playersWaiting = !isSolo && team && team.askingUsers.map((user) => ({
    username: user.username,
    fullname: `${user.firstname} ${user.lastname}`,
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
          content: `Confirmez le refus de ${user.username}`,
          title: 'Refuser un joueur',
        })}
      >
        Refuser
      </Button>
    </>) : '',
  }));

  if (!team) {
    return null;
  }

  return (
    <div id="dashboard-team">
      <div className="header">
        <div className="info">
          {!isSolo && <p><strong>Mon équipe :</strong> {team.name}</p>}
          <p><strong>Tournoi :</strong> {team.tournament.name}</p>
        </div>
        <div className="status">
          <p>Statut : Non payé</p>
          <Button
            primary
            onClick={() => push('/dashboard/shop')}
            rightIcon="fas fa-shopping-cart"
          >
            Payer
          </Button>
        </div>
      </div>

      {!isSolo ? (
        <>
          <div className="players-list">
            <Title level={4}>Joueurs</Title>
            <Table columns={columns} dataSource={players} alignRight className="table-players"/>
          </div>
          <div className="players-list">
            <Title level={4}>Joueurs en attente</Title>
            <Table columns={columns} dataSource={playersWaiting} alignRight className="table-players"/>
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
