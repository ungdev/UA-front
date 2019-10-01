import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createTeam } from '../../modules/team';
import { fetchTournamentTeam } from '../../modules/tournament';
import dashboard from '../../assets/dashboard';
import { Input, Select, Button, Title, Tabs } from '../../components/UI';

//a récupérer de l'API
const tournamentsList = [
  { label: 'League of Legends (Pro)', value: '1' },
  { label: 'League of Legends (Amateur)', value: '2' },
  { label: 'Fornite', value: '3' },
  { label: 'Counter Strike: GO', value: '4' },
];

const Register = () => {
  const [tournament, setTournament] = useState('1');
  const [name, setName] = useState('');
  const [panel, setPanel] = useState('main');
  const dispatch = useDispatch();
  const tournaments = useSelector((state) => state.tournament.tournaments);

  const fetchTeams = (i) => {
    if (!tournaments || !tournaments[i+1]) {
      dispatch(fetchTournamentTeam(i+1));
    }
  };

  const mainPanel = (
    <>
      <div>
        {dashboard.register.create}
        <Select label="Tournoi" options={tournamentsList} value={tournament} onChange={setTournament} />
        <Input label="Nom d'équipe" value={name} onChange={setName} />
        <Button onClick={() => dispatch(createTeam({ name, tournament }))} primary>Créer mon équipe <i className="fas fa-plus" /></Button>
      </div>
      <div>
        {dashboard.register.join}
        <Button
          onClick={() => {
            fetchTeams(0);
            setPanel('join');
          }}
          primary
        >Rejoindre une équipe <i className="fas fa-users" /></Button>
      </div>
    </>
  );

  const joinPanel = (
    <>
      <Title level={3}><i className="fas fa-arrow-left" onClick={() => setPanel('main')}/> Rejoindre une équipe</Title>
      <Tabs tabs={[{
        title: 'LoL (Pro)',
        content: 'ISSOU',
        onClick: fetchTeams,
      }, {
        title: 'LoL (Amateur)',
        content: 'OUI',
        onClick: fetchTeams,
      }]}/>
    </>
  );

  return (
    <div id="dashboard-register">
      { panel === 'main' ? mainPanel : joinPanel }
    </div>
  );
};

export default Register;
