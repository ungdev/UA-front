import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchTeam, setCaptain, acceptUser, kickUser, refuseUser, deleteTeam } from '../../modules/team';
import { Title, Table, Button, Modal, Helper } from '../../components/UI';

import './team.css';
import { API } from '../../utils';

const playersColumns = [
  { title: 'Pseudo', key: 'username' },
  { title: 'Nom', key: 'fullname' },
  { title: 'Email', key: 'email' },
  { title: 'A payé', key: 'isPaid' },
  { title: '', key: 'action' },
];

const waitingPlayersColumns = [
  { title: 'Pseudo', key: 'username' },
  { title: 'Nom', key: 'fullname' },
  { title: 'Email', key: 'email' },
  { title: '', key: 'action' },
];

const initialModal = { onOk: () => {}, visible: false, content: '', title: '' };

const Team = () => {
  const [modal, setModal] = useState(initialModal);
  const [slot, setSlot] = useState({ total: 0, available: 0 });
  const dispatch = useDispatch();
  const { id, team: userTeam } = useSelector((state) => state.login.user || { id: '', team: '' });
  const { team } = useSelector((state) => state.team);

  const isCaptain = team && team.captainId === id;
  const isSolo = team && team.name.includes('solo-team');
  const usersPaid = team && team.users.reduce((previous, user) => user.isPaid ? previous + 1 : previous, 0);

  const fetchSlot = async () => {
    const res = await API.get(`tournaments/${team.tournament.id}/teams?paidOnly=true`);
    const total = team.tournament.maxPlayers / team.tournament.playersPerTeam;
    const available = total - res.data.length;
    setSlot({ total, available });
  };

  useEffect(() => {
    if (userTeam && userTeam.id) {
      dispatch(fetchTeam(userTeam.id));
    }
  }, [userTeam]);

  useEffect(() => {
    if (team) {
      fetchSlot();
    }
  }, [team]);

  const players = !isSolo && team && team.users.map((user) => {
    return ({
      username: user.id === team.captainId ? <>{user.username} <i className="fas fa-crown gold-icon"></i></> : user.username,
      fullname: `${user.firstname} ${user.lastname}`,
      email: user.email,
      isPaid: user.isPaid ? <i className="fas fa-check green-icon" /> : <i className="fas fa-times red-icon" />,
      action: user.id !== team.captainId && isCaptain ? (
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
      ) : '',
    });
  });

  const waitingPlayers = !isSolo && team && team.askingUsers.map((user) => ({
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
          content: `Voulez-vous refuser ${user.username} ?`,
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
        {!isSolo && <div><strong>Mon équipe :</strong> {team.name}</div>}
        <div><strong>Tournoi :</strong> {team.tournament.name}</div>
        <div>
          <strong>Statut</strong> <Helper>Pour être inscrite, une équipe doit être complète et tous les membres de l'équipe doivent avoir payé leur place.</Helper>
          <strong> : </strong>
          {usersPaid === team.tournament.playersPerTeam
            ? <><i className="fas fa-check-circle green-icon"></i> Inscrite</>
            : <><i className="fas fa-exclamation-triangle red-icon"></i> Non inscrite</>
          }
        </div>
        <div>
          <strong> Places disponibles :</strong> {slot.available} / {slot.total}
        </div>
      </div>

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
