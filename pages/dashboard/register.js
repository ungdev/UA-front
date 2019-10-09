import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Input, Select, Button, Tabs, Table } from '../../components/UI';
import { createTeam, joinTeam, cancelJoin } from '../../modules/team';
import { fetchTournamentTeam } from '../../modules/tournament';

import dashboard from '../../assets/dashboard';
import './register.css';

//a récupérer de l'API ???
const tournamentsList = [
  { label: 'League of Legends (Pro)', value: '1', shortName: 'LoL (Pro)' },
  { label: 'League of Legends (Amateur)', value: '2', shortName: 'LoL (Amateur)' },
  { label: 'Fortnite', value: '3', shortName: 'Fortnite' },
  { label: 'Counter Strike: GO', value: '4', shortName: 'CS:GO' },
];

const tournamentsSolo = [
  { label: 'Super Smash Bros Ultimate', value: '5' },
  { label: 'osu!', value: '6' },
  { label: 'Libre', value: '7' },
];

const columns = [
  { title: 'Equipe', key: 'team' },
  { title: 'Joueurs', key: 'players' },
  { title: '', key: 'action' },
];

const Register = () => {
  const [tournament, setTournament] = useState('1');
  const [tournamentSolo, setTournamentSolo] = useState('5');
  const [name, setName] = useState('');
  const [panel, setPanel] = useState('main');
  const dispatch = useDispatch();
  const tournaments = useSelector((state) => state.tournament.tournaments);
  const { username, askingTeamId } = useSelector((state) => state.login.user || { username: '', askingTeamId: '' });
  const soloTeamName = `${username}-solo-team`;

  const fetchTeams = (i) => {
    if (!tournaments || !tournaments[i+1]) {
      dispatch(fetchTournamentTeam(i+1));
    }
  };

  const formatTeams = (i) => {
    if (!tournaments || !tournaments[i]) {
      return [];
    }
    const dataSource = tournaments[i].map(({ name, users, id }) => {
      const players = users.map((user) => user.username).join(', ');
      return {
        team: askingTeamId === id ? `${name} (demande en attente)` : name,
        players,
        action: askingTeamId === id
          ? <Button onClick={() => dispatch(cancelJoin(id, name))}>Annuler</Button>
          : <Button primary onClick={() => dispatch(joinTeam(id, name))}>Rejoindre</Button>,
        };
    });
    return <Table columns={columns} dataSource={dataSource} alignRight className="table-join" />;
  };

  const tabs = tournamentsList.map(({ shortName, value }) => ({
    title: shortName,
    content: formatTeams(value),
    onClick: fetchTeams,
  }));

  const mainPanel = (
    <>
      <div className="team-tournament">
        <div className="create-team">
          {dashboard.register.create.info}
          <Select label="Tournoi" options={tournamentsList} value={tournament} onChange={setTournament} />
          <Input label="Nom d'équipe" value={name} onChange={setName} />
          <Button
            primary
            className="center"
            onClick={() => dispatch(createTeam({ name, tournament }))}
            rightIcon="fas fa-plus"
          >
            Créer mon équipe
          </Button>
          {dashboard.register.create.discord}
        </div>

        <div className="join-team">
          {dashboard.register.join.info}
          <Button
            primary
            className="center"
            onClick={() => {
              fetchTeams(0);
              setPanel('join');
            }}
            rightIcon="fas fa-users"
          >
            Rejoindre une équipe
          </Button>
          {dashboard.register.join.discord}
        </div>
      </div>
      <div className="create-solo-team">
        {dashboard.register.solo}
        <Select label="Tournoi" options={tournamentsSolo} value={tournamentSolo} onChange={setTournamentSolo} />
        <Button
          primary
          onClick={() => dispatch(createTeam({ tournament: tournamentSolo, name: soloTeamName }))}
          rightIcon="fas fa-user"
        >
          S'inscrire en solo
        </Button>
      </div>
    </>
  );

  const joinPanel = (
    <>
      <Button onClick={() => setPanel('main')} leftIcon="fas fa-arrow-left">Retour</Button>
      <Tabs tabs={tabs}/>
    </>
  );

  return (
    <div id="dashboard-register">
      { panel === 'main' ? mainPanel : joinPanel }
    </div>
  );
};

export default Register;
