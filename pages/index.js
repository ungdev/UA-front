import React, { useState } from 'react';
import { Title, Collapse, Table, Input, Textarea } from '../components';

const columns = [
  { title: 'Nom', key: 'nom' },
  { title: 'Prénom', key: 'prenom' },
];

const dataSource = [
  { key: '1', nom: 'Fontaine', prenom: 'Jean' },
  { key: '2', prenom: 'Hugo', nom: 'Victor' },
];

const Home = () => {
  const [value, setValue] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <Title level={1} align="center">Home</Title>
      <Title level={2} align="right">Home</Title>
      <Title level={4}>Test</Title>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula
      get dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient m
      ontes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pret
      ium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliqu
      et nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae
      , justo. Nullam dictum felis eu pede
      <Collapse title="mon titre">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula get dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient m ontes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pret ium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliqu et nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae , justo. Nullam dictum felis eu pede</Collapse>
      <Table columns={columns} dataSource={dataSource} />
      <Input id="test" label="Test" placeholder="valeur ici" value={value} onChange={setValue} />
      <Input id="password" label="mot de passe" value={password} type="password" onChange={setPassword} />
      <Textarea id="textarea" label="Description" placeholder="Long text" value={value} onChange={setValue} />
    </div>
  );
};

export default Home;
