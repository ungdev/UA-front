import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

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

const Register = () => {
  const [tournament, setTournament] = useState('1');
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  return (
    <div id="dashboard-register">
      {dashboard.register.create}
      <Select label="Tournoi" options={tournaments} value={tournament} onChange={setTournament} />
      <Input label="Nom d'équipe" value={name} onChange={setName} />
      <Button onClick={() => dispatch(createTeam({ name, tournament }))} primary>Créer mon équipe <i className="fas fa-plus" /></Button>
    </div>
  );
};

export default Register;
