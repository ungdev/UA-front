import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchTeam, setCaptain, acceptUser } from '../../modules/team';
import { Title, Table, Button } from '../../components/UI';

import './team.css';

const columns = [
  { title: 'Pseudo', key: 'username' },
  { title: 'Nom', key: 'fullname' },
  { title: 'Email', key: 'email' },
  { title: '', key: 'action' },
];

const Team = () => {
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
  const players = team && team.users.map(({ username, firstname, lastname, id, email }) => ({
    username: id === team.captainId ? `${username} 🜲`: username,
    fullname: `${firstname} ${lastname}`,
    email,
    action: id !== team.captainId && isCaptain ? (<>
      <Button onClick={() => dispatch(setCaptain(id, team.id))}>Designer comme chef</Button>
      <Button>Exclure</Button>
    </>) : '',
  }));
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
