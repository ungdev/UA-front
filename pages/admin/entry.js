import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchUser, searchBarcode } from '../../modules/userEntry';
import { Input, Title, Button, Card } from '../../components/UI';

const Entry = () => {
  const [barcode, setBarcode] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const barcodeUser = useSelector((state) => state.userEntry.barcodeUser);
  const changeBarcode = (value) => {
    setBarcode(value);
    if (value.length === 12) {
      dispatch(searchBarcode(value));
    }
  };

  return (
    <div>
      <div>
        <Title level={2}>Scanner une place</Title>
        <Card
          content={<>
            <p>Nom: {barcodeUser && barcodeUser.lastname}</p>
            <p>Prénom: {barcodeUser && barcodeUser.firstname}</p>
            <p>Email: {barcodeUser && barcodeUser.email}</p>
            <p>Equipe: {barcodeUser && barcodeUser.team.name}</p>
            <p>Tournoi: {barcodeUser && barcodeUser.team.tournament.name}</p>
            <p>Statut:</p>
          </>}
        />
        <Input
          value={barcode}
          onChange={changeBarcode}
          label="Barcode"
          autoFocus
        />
        <Title level={4} align='center'>OU</Title>
        <Input
          value={username}
          onChange={setUsername}
          label="Manuellement"
          placeholder="Email, pseudo, nom"
        />
        <Button primary>Valider</Button>
      </div>
      <div>
        <Title level={2}>Valider paiement</Title>
        <Input
          value={email}
          onChange={setEmail}
          label="Rechercher utilisateur"
          placeholder="Email, pseudo, nom"
        />
        <Button primary onClick={() => dispatch(searchUser(email))}>Rechercher</Button>
      </div>
    </div>
  );
};

export default Entry;
