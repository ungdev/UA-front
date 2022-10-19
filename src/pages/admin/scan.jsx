import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { bypassQrScan, registerCashPayment, scan, searchUser, SET_SEARCH_USER } from '../../modules/userEntry.js';
import { Input, Title, Button, Card, QRCodeReader } from '../../components/UI';

/**
 * @typedef UserScan
 * @property {string} id
 * @property {'player'|'coach'|'orga'|'spectator'} type
 * @property {boolean} hasPaid
 * @property {string} username
 * @property {string} firstname
 * @property {string} lastname
 * @property {'adult'|'child'} age
 * @property {string} email
 * @property {Array<'admin'|'entry'|'anim'|'stream'>} permissions
 * @property {string} [place]
 * @property {string} [scannedAt]
 * @property {string} discordId
 * @property {string} customMessage
 * @property {{
 *  firstname: string;
 *  lastname: string;
 *  id: string;
 * }} [attendant]
 * @property {{
 *  id: string;
 *  name: string;
 *  captainId: string;
 *  lockedAt: string;
 *  tournament: {
 *    id: string;
 *    name: string;
 *  };
 * }} team
 */

const Entry = () => {
  /** @type {UserScan} */
  const scannedUser = useSelector((state) => state.userEntry.searchUser);
  const [userIdentifiable, setUserIdentifiable] = useState();
  const lastCode = useRef();
  const dispatch = useDispatch();

  const onCodeScanned = (code) => {
    const base64Code = window.btoa(String.fromCharCode.apply(null, code.binaryData));
    if (scannedUser || base64Code === lastCode.current) return;
    lastCode.current = base64Code;
    return dispatch(scan(base64Code));
  };

  return (
    <div id="admin-entry">
      <div className="scan">
        <Title level={2}>Scanner une place</Title>
        <div className="entry-content">
          <Card
            className={scannedUser ? '' : 'borderless'}
            content={
              !scannedUser ? (
                <div className="scanner">
                  <div className="scanner-placeholder">
                    <i className="fas fa-video scanner-placeholder-icon" />
                    Veuillez activer votre caméra
                  </div>
                  <QRCodeReader onCode={(code) => onCodeScanned(code)} className="scanner-preview"></QRCodeReader>
                </div>
              ) : (
                <>
                  <p>
                    <strong>Pseudo :</strong> {scannedUser.username}
                  </p>
                  <p>
                    <strong>Nom :</strong> {scannedUser.lastname}
                  </p>
                  <p>
                    <strong>Prénom :</strong> {scannedUser.firstname}
                  </p>
                  <p>
                    {scannedUser.age === 'child' && <i className="fas fa-exclamation-triangle red" />}
                    <strong>Âge :</strong> {scannedUser.age === 'child' ? 'Mineur' : 'Majeur'}
                  </p>
                  <p>
                    <strong>Type :</strong>{' '}
                    {scannedUser.type === 'player' ? (
                      'Joueur'
                    ) : scannedUser.type === 'coach' ? (
                      'Coach/Manager'
                    ) : scannedUser.type === 'spectator' ? (
                        'Spectateur'
                    ) : scannedUser.type === 'orga' ? (
                      'Orga'
                    ) : (
                      <em className="default">Mais qui est cette étrange personne ?!</em>
                    )}
                  </p>
                  <p>
                    <strong>Équipe :</strong>{' '}
                    {scannedUser.team?.name ?? (
                      <>
                        <em className="default">L'utilisateur n'est pas dans une équipe</em>
                      </>
                    )}
                  </p>
                  <p>
                    <strong>Tournoi :</strong>{' '}
                    {scannedUser.team?.tournament.name ?? (
                      <>
                        <em className="default">L'utilisateur n'est pas inscrit à un tournoi !</em>
                      </>
                    )}
                  </p>
                  <p>
                    <strong>Place :</strong>{' '}
                    {scannedUser.place ?? (
                      <>
                        <em className="default">L'utilisateur n'a pas de place attribuée</em>
                      </>
                    )}
                  </p>
                  <p>
                    {scannedUser.customMessage && <i className="fas fa-exclamation-triangle red" />}
                    <strong>Infos complémentaires :</strong>{' '}
                    {scannedUser.customMessage || (
                      <>
                        <em className="default">Aucune information particulière</em>
                      </>
                    )}
                  </p>
                  {scannedUser.attendant?.id && (
                    <p>
                      <strong>Accompagnateur :</strong> {scannedUser.attendant.firstname}{' '}
                      {scannedUser.attendant.lastname}
                    </p>
                  )}
                  <p>
                    <strong>Payé :</strong> {scannedUser.hasPaid ? 'Oui' : 'Non'}
                  </p>
                  <div className="buttonRow">
                    <Button
                      primary={true}
                      disabled={scannedUser.hasPaid}
                      onClick={() => dispatch(registerCashPayment())}>
                      Valider le paiement
                    </Button>
                    <Button
                      primary={true}
                      disabled={!scannedUser.hasPaid || !!scannedUser.scannedAt}
                      onClick={() => dispatch(bypassQrScan())}>
                      Valider l'entrée
                    </Button>
                  </div>
                </>
              )
            }
          />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              scannedUser
                ? dispatch({
                    type: SET_SEARCH_USER,
                    searchUser: null,
                  })
                : dispatch(searchUser(userIdentifiable));
            }}>
            {!scannedUser && (
              <>
                <div>Saisie manuelle</div>
                <Input
                  label="Entrer l'adresse mail de l'utilisateur"
                  onChange={setUserIdentifiable}
                  value={userIdentifiable}
                />
              </>
            )}
            <Button type="submit">{scannedUser ? 'Scanner un autre billet' : "Rechercher l'utilisateur"}</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Entry;
