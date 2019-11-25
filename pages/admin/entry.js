import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { searchUser, scan, SET_BARCODE_USER } from '../../modules/userEntry.js';
import { Input, Title, Button, Card } from '../../components/UI';

import './entry.css';

const Entry = () => {
  const [barcode, _setBarcode] = useState('');
  const [paymentSearch, setPaymentSearch] = useState('');

  const dispatch = useDispatch();
  const barcodeUser = useSelector((state) => state.userEntry.barcodeUser);

  const setBarcode = (barcode) => {
    _setBarcode(barcode);

    if (barcode === '') {
      resetBarcodeUser();
      return;
    }

    const isValid = /^\d{12}$/.test(barcode);
    if (isValid) {
      dispatch(scan(barcode));
    }
  };

  const resetBarcodeUser = () => {
    dispatch({
      type: SET_BARCODE_USER,
      barcodeUser: null,
    });
  };

  return (
    <div id="admin-entry">
      <div className="scan">
        <Title level={2}>Scanner une place</Title>
        <div className="entry-content">
          <Card
            content={<>
              <p><strong>Pseudo :</strong> {barcodeUser && barcodeUser.username}</p>
              <p><strong>Nom :</strong> {barcodeUser && barcodeUser.lastname}</p>
              <p><strong>Prénom :</strong> {barcodeUser && barcodeUser.firstname}</p>
              <p><strong>Email :</strong> {barcodeUser && barcodeUser.email}</p>
              <p><strong>Équipe :</strong> {barcodeUser && barcodeUser.team.name}</p>
              <p><strong>Tournoi :</strong> {barcodeUser && barcodeUser.team.tournament.shortName}</p>
              <p><strong>Place :</strong> {barcodeUser && barcodeUser.place}</p>
            </>}
          />
          <form onSubmit={(e) => {
            e.preventDefault();
            dispatch(scan(barcode));
          }}>
            <Input
              value={barcode}
              onChange={setBarcode}
              label="Code-barres"
              autoFocus
            />
            <Button primary type="submit">Valider</Button>
            <Button onClick={() => setBarcode('')}>Réinitialiser</Button>
          </form>
        </div>
      </div>
      <div>
        <Title level={2}>Valider un paiement</Title>
        <div className="entry-content">
          <form onSubmit={(e) => {
            e.preventDefault();
            dispatch(searchUser(paymentSearch));
          }}>
            <Input
              value={paymentSearch}
              onChange={setPaymentSearch}
              label="Email, pseudo, nom"
            />
            <Button primary type="submit">Rechercher</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Entry;
