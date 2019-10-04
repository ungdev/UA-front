import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchTeam, setCaptain, acceptUser, kickUser } from '../../modules/team';
import { Title, Table, Button } from '../../components/UI';

import './team.css';

const columns = [
  { title: 'Pseudo', key: 'username' },
  { title: 'Nom', key: 'fullname' },
  { title: 'Email', key: 'email' },
  { title: '', key: 'action' },
];

const Team = () => {
  const [confirm, setConfirm] = useState({ id: '', statut: false });
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
  const players = team && team.users.map((user) => {
    const needConfirm = confirm.id === user.id && confirm.statut;
    return ({
      username: user.id === team.captainId ? `${user.username} 🜲`: user.username,
      fullname: `${user.firstname} ${user.lastname}`,
      email: user.email,
      action: user.id !== team.captainId && isCaptain ? (<>
        <Button onClick={() => dispatch(setCaptain(user.id, team.id))}>Designer comme chef</Button>
        <Button onClick={() => {
          if (!confirm.statut) {
            setConfirm({ id: user.id, statut: true });
          }
          else if (needConfirm) {
            dispatch(kickUser(user, team.id));
          }
          }}
          primary={needConfirm ? true : false}
        >{ needConfirm ? 'Confirmer?' : 'Exclure'}</Button>
      </>) : '',
    });
  });
  const playersWaiting = team && team.askingUsers.map((user) => ({
    username: user.username,
    fullname: `${user.firstname} ${user.lastname}`,
    email: user.email,
    action: user.id !== team.captainId && isCaptain ? (<>
      <Button onClick={() => dispatch(acceptUser(user, team.id))} primary>Accepter</Button>
      <Button>Refuser</Button>
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

        </>
      )}
    </div>
  );
};

export default Team;
