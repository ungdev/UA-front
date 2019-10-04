import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchTeam, setCaptain, acceptUser, kickUser, refuseUser } from '../../modules/team';
import { Title, Table, Button, Modal } from '../../components/UI';

import './team.css';

const columns = [
  { title: 'Pseudo', key: 'username' },
  { title: 'Nom', key: 'fullname' },
  { title: 'Email', key: 'email' },
  { title: '', key: 'action' },
];

const initialModal = { onOk: () => {}, visible: false, content: '' };

const Team = () => {
  const [modal, setModal] = useState(initialModal);
  const dispatch = useDispatch();
  const { id, team: userTeam } = useSelector((state) => state.login.user || { id: '', team: '' });
  const { team } = useSelector((state) => state.team);
  const isCaptain = team && team.captainId === id;
  const isSolo = team && team.name.includes('solo-team');
  useEffect(() => {
    if (userTeam && userTeam.id) {
      dispatch(fetchTeam(userTeam.id));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTeam]);
  const players = team && team.users.map((user) => {
    return ({
      username: user.id === team.captainId ? `${user.username} 🜲`: user.username,
      fullname: `${user.firstname} ${user.lastname}`,
      email: user.email,
      action: user.id !== team.captainId && isCaptain ? (<>
        <Button onClick={() => setModal({
          visible: true,
          onOk: () => {
            dispatch(setCaptain(user.id, team.id));
            setModal(initialModal);
          },
          content: 'Confirmez le nouveau chef d\'équipe',
        })}>Designer comme chef</Button>
        <Button onClick={() => setModal({
          visible: true,
          onOk: () => {
            dispatch(kickUser(user, team.id));
            setModal(initialModal);
          },
          content: 'Confirmez l\'exclusion du joueur',
        })}
        >Exclure</Button>
      </>) : '',
    });
  });
  const playersWaiting = team && team.askingUsers.map((user) => ({
    username: user.username,
    fullname: `${user.firstname} ${user.lastname}`,
    email: user.email,
    action: user.id !== team.captainId && isCaptain ? (<>
      <Button onClick={() => dispatch(acceptUser(user, team.id))} primary>Accepter</Button>
      <Button onClick={() => setModal({
        visible: true,
        onOk: () => {
          dispatch(refuseUser(user, team.id));
          setModal(initialModal);
        },
        content: 'Confirmez le refus du joueur',
      })}>Refuser</Button>
    </>) : '',
  }));
  return (
    <div id="dashboard-team">
      { !!team && !isSolo && (
        <>
          <Title level={4}>Mon équipe: {team.name}</Title>
          <Title level={4}>Tournoi: {team.tournament.name}</Title>
          <Title level={4}>Joueurs</Title>
          <Table columns={columns} dataSource={players} alignRight classNameTable="table-players"/>
          <Title level={4}>Joueurs en attente</Title>
          <Table columns={columns} dataSource={playersWaiting} alignRight classNameTable="table-players"/>
          <Modal
            onOk={modal.onOk}
            onCancel={() => setModal({ ...initialModal, visible: false })}
            visible={modal.visible}
          >{modal.content}</Modal>
        </>
      )}
    </div>
  );
};

export default Team;
