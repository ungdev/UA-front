import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchUser, searchBarcode } from '../../modules/userEntry';
import { Input, Title, Button, Card } from '../../components/UI';
import './entry.css';

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
    <div id="admin-entry">
      <div className="scan">
        <Title level={2}>Scanner une place</Title>
        <div className='entry-content'>
          <Card
            content={<>
              <p><strong>Nom:</strong> {barcodeUser && barcodeUser.lastname}</p>
              <p><strong>Prénom:</strong> {barcodeUser && barcodeUser.firstname}</p>
              <p><strong>Email:</strong> {barcodeUser && barcodeUser.email}</p>
              <p><strong>Equipe:</strong> {barcodeUser && barcodeUser.team.name}</p>
              <p><strong>Tournoi:</strong> {barcodeUser && barcodeUser.team.tournament.name}</p>
              <p><strong>Place:</strong></p>
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
      </div>
      <div>
        <Title level={2}>Valider un paiement</Title>
        <div className='entry-content'>
          <Input
            value={email}
            onChange={setEmail}
            label="Rechercher utilisateur"
            placeholder="Email, pseudo, nom"
          />
          <Button primary onClick={() => dispatch(searchUser(email))}>Rechercher</Button>
        </div>
      </div>
    </div>
  );
};

export default Entry;
