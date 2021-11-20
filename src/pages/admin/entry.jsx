import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { searchUser, scan } from '../../modules/userEntry.js';
import { Input, Title, Button, Card, QRCodeReader } from '../../components/UI';

const Entry = () => {
  const [paymentSearch, setPaymentSearch] = useState('');
  const dispatch = useDispatch();

  const [order, setOrder] = useState();
  const lastCode = useRef();

  const onCodeScanned = async (code) => {
    const base64Code = window.btoa(String.fromCharCode.apply(null, code.binaryData));
    if (order || base64Code === lastCode.current) return;
    lastCode.current = base64Code;

    const res = await scan(base64Code);
    if (res) setOrder(res);
  };

  return (
    <div id="admin-entry">
      <div className="scan">
        <Title level={2}>Scanner une place</Title>
        <div className="entry-content">
          <Card
            className={order ? '' : 'borderless'}
            content={
              !order ? (
                <div className="scanner">
                  <div className="scanner-placeholder">
                    <i className="fas fa-video scanner-placeholder-icon" />
                    Veuillez activer votre caméra
                  </div>
                  <QRCodeReader onCode={onCodeScanned} activated={!order} className="scanner-preview"></QRCodeReader>
                </div>
              ) : (
                <>
                  <p>
                    <strong>Pseudo :</strong> {order && order.username}
                  </p>
                  <p>
                    <strong>Nom :</strong> {order && order.lastname}
                  </p>
                  <p>
                    <strong>Prénom :</strong> {order && order.firstname}
                  </p>
                  <p>
                    <strong>Type :</strong> {order && order.type}
                  </p>
                  <p>
                    <strong>Permissions :</strong>{' '}
                    {order && order.permissions.length ? order.permissions.join(', ') : 'Aucune'}
                  </p>
                  <p>
                    <strong>Âge :</strong> {order && order.age}
                  </p>
                  <p>
                    <strong>Email :</strong> {order && order.email}
                  </p>
                  <p>
                    <strong>Équipe :</strong> {order && order.team ? order.team.name : 'Accompagnateur'}
                  </p>
                  <p>
                    <strong>Tournoi :</strong> {order && order.team && order.team.tournament.shortName}
                  </p>
                  <p>
                    <strong>Place :</strong> {order && order.place}
                  </p>
                  <p>
                    <strong>Infos complémentaires :</strong> {(order && order.customMessage) || <span>N/A</span>}
                  </p>
                  <p>
                    <strong>Team :</strong> {order?.teamName}
                  </p>
                  <p>
                    <strong>Tournoi :</strong> {order?.tournamentName}
                  </p>
                  {order?.attendant?.id && (
                    <p>
                      <strong>Accompagnateur :</strong> {order.attendant.firstname} {order.attendant.lastname}
                    </p>
                  )}
                </>
              )
            }
          />
          <Button onClick={() => setOrder(undefined)}>
            {order ? 'Scanner un autre billet' : "Rechercher l'utilisateur"}
          </Button>
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
