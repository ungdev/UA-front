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

    const isValid = /^\d{13}$/.test(barcode);
    if (isValid) {
      dispatch(scan(barcode.substring(0, 12)));
    }
  };

  const resetBarcodeUser = () => {
    dispatch({
      type: SET_BARCODE_USER,
      barcodeUser: null,
    });
  };

  const onBarcodeChange = (_text) => {
    const mappings = [
      ['&', '1'],
      ['é', '2'],
      ['"', '3'],
      ["'", '4'],
      ['(', '5'],
      ['-', '6'],
      ['è', '7'],
      ['_', '8'],
      ['ç', '9'],
      ['à', 0],
    ];
    let text = _text;

    mappings.forEach((mapping) => {
      text = text.replace(mapping[0], mapping[1]);
    });

    _setBarcode(text);
  };

  return (
    <div id="admin-entry">
      <div className="scan">
        <Title level={2}>Scanner une place</Title>
        <div className="entry-content">
          <Card
            content={
              <>
                <p>
                  <strong>Pseudo :</strong> {barcodeUser && barcodeUser.username}
                </p>
                <p>
                  <strong>Nom :</strong> {barcodeUser && barcodeUser.lastname}
                </p>
                <p>
                  <strong>Prénom :</strong> {barcodeUser && barcodeUser.firstname}
                </p>
                <p>
                  <strong>Email :</strong> {barcodeUser && barcodeUser.email}
                </p>
                <p>
                  <strong>Équipe :</strong> {barcodeUser && barcodeUser.team ? barcodeUser.team.name : 'Accompagnateur'}
                </p>
                <p>
                  <strong>Tournoi :</strong> {barcodeUser && barcodeUser.team && barcodeUser.team.tournament.shortName}
                </p>
                <p>
                  <strong>Place :</strong> {barcodeUser && barcodeUser.place}
                </p>
              </>
            }
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setBarcode(barcode);
            }}>
            <Input value={barcode} label="Code-barres" onChange={onBarcodeChange} autoFocus />
            <Button primary type="submit">
              Valider
            </Button>
            <Button onClick={() => setBarcode('')}>Réinitialiser</Button>
          </form>
        </div>
      </div>
      <div>
        <Title level={2}>Valider un paiement</Title>
        <div className="entry-content">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(searchUser(paymentSearch));
            }}>
            <Input value={paymentSearch} onChange={setPaymentSearch} label="Email, pseudo, nom" />
            <Button primary type="submit">
              Rechercher
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Entry;
