import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createTeam } from '../../modules/team';
import dashboard from '../../assets/dashboard';
import { Input, Select, Button } from '../../components/UI';

//a récupérer de l'API
const tournaments = [
  { label: 'League of Legends (Pro)', value: '1' },
  { label: 'League of Legends (Amateur)', value: '2' },
  { label: 'Fornite', value: '3' },
  { label: 'Counter Strik: GO', value: '4' },
];

const tournamentsSolo = [
  { label: 'Super Smash Bros Ultimate', value: '5' },
  { label: 'osu!', value: '6' },
  { label: 'Libre', value: '7' },
];

const Register = () => {
  const [tournament, setTournament] = useState('1');
  const [tournamentSolo, setTournamentSolo] = useState('5');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const username = useSelector((state) => state.login.user && state.login.user.username);
  const soloTeamName = `${username}-solo-team`;

  return (
    <div id="dashboard-register">
      <div>
        {dashboard.register.create.info}
        <Select label="Tournoi" options={tournaments} value={tournament} onChange={setTournament} />
        <Input label="Nom d'équipe" value={name} onChange={setName} />
        <Button onClick={() => dispatch(createTeam({ name, tournament }))} primary>
          Créer mon équipe <i className="fas fa-plus" />
        </Button>
        {dashboard.register.create.discord}
      </div>
      <div>
        {dashboard.register.solo}
        <Select label="Tournoi" options={tournamentsSolo} value={tournamentSolo} onChange={setTournamentSolo} />
        <Button onClick={() => dispatch(createTeam({ tournament: tournamentSolo, name: soloTeamName }))} primary>
          S'inscrire en solo <i className="fas fa-user" />
        </Button>
      </div>
    </div>
  );
};

export default Register;
