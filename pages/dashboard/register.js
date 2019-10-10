import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Input, Select, Button, Tabs, Table } from '../../components/UI';
import { createTeam, joinTeam, cancelJoin } from '../../modules/team';
import { fetchTournaments } from '../../modules/tournament';
import dashboard from '../../assets/dashboard';

import './register.css';

const columns = [
  { title: 'Équipe', key: 'team' },
  { title: 'Joueurs', key: 'players' },
  { title: '', key: 'action' },
];

const Register = () => {
  const [tournament, setTournament] = useState('1');
  const [tournamentSolo, setTournamentSolo] = useState('5');
  const [teamName, setTeamName] = useState('');
  const [panel, setPanel] = useState('main');
  const dispatch = useDispatch();
  const tournaments = useSelector((state) => state.tournament.tournaments);
  const { username, askingTeamId } = useSelector((state) => state.login.user || { username: '', askingTeamId: '' });
  const soloTeamName = `${username}-solo-team`;

  useEffect(() => {
    dispatch(fetchTournaments());
  }, []);

  if(!tournaments) {
    return null;
  }

  // Split multiplayer and solo tournaments
  const tournamentsList = tournaments.filter((tournament) => tournament.playersPerTeam > 1);
  const tournamentsSoloList = tournaments.filter((tournament) => tournament.playersPerTeam === 1);

  // Get tournaments category select options
  const tournamentsOptions = tournamentsList.map((tournament) => ({
    label: tournament.name,
    value: tournament.id,
  }));
  const tournamentsSoloOptions = tournamentsSoloList.map((tournament) => ({
    label: tournament.name,
    value: tournament.id,
  }));

  // Get multiplayer tournaments tabs
  const tournamentsTabs = tournamentsList.map((tournament) => {
    const tournamentTeams = tournament.teams.map((team) => ({
      team: askingTeamId === team.id ? `${team.name} (demande en attente)` : team.name,
      players: team.users.map((user) => user.username).join(', '),
      action: askingTeamId === team.id
        ? <Button onClick={() => dispatch(cancelJoin(team.id, team.name))}>Annuler</Button>
        : <Button primary onClick={() => dispatch(joinTeam(team.id, team.name))}>Rejoindre</Button>,
    }));

    return {
      title: tournament.shortName,
      content: <Table columns={columns} dataSource={tournamentTeams} alignRight className="table-join" />,
    };
  });

  const mainPanel = (
    <>
      <div className="team-tournament">
        <div className="create-team">
          {dashboard.register.create.info}
          <Select label="Tournoi" options={tournamentsOptions} value={tournament} onChange={setTournament}/>
          <Input label="Nom d'équipe" value={teamName} onChange={setTeamName} className="select" />
          <Button
            primary
            className="center"
            onClick={() => dispatch(createTeam({ teamName, tournament }))}
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
            onClick={() => setPanel('join')}
            rightIcon="fas fa-users"
          >
            Rejoindre une équipe
          </Button>
          {dashboard.register.join.discord}
        </div>
        </div>
        <div className="create-solo-team">
        {dashboard.register.solo}
        <Select label="Tournoi" options={tournamentsSoloOptions} value={tournamentSolo} onChange={setTournamentSolo}/>
        <Button
          primary
          className="center-mobile"
          onClick={() => dispatch(createTeam({ teamName: soloTeamName, tournament: tournamentSolo }))}
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
      <Tabs tabs={tournamentsTabs}/>
    </>
  );

  return (
    <div id="dashboard-register">
      { panel === 'main' ? mainPanel : joinPanel }
    </div>
  );
};

export default Register;
