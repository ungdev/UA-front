'use client';
import { useState, useRef } from 'react';

import { bypassQrScan, registerCashPayment, scan, searchUser, setSearchUser } from '@/modules/userEntry';
import { Input, Title, Button, Card, QRCodeReader, Icon } from '@/components/UI/index';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import type { Action } from '@reduxjs/toolkit';
import { UserAge, UserType } from '@/types';
import { QRCode } from 'jsqr';

const Entry = () => {
  const scannedUser = useAppSelector((state) => state.userEntry.searchUser);
  const [userIdentifiable, setUserIdentifiable] = useState<string>('');
  const lastCode = useRef<string>();
  const dispatch = useAppDispatch();

  const onCodeScanned = (code: QRCode) => {
    const base64Code = window.btoa(String.fromCharCode.apply(null, code.binaryData));
    if (scannedUser || base64Code === lastCode.current) return;
    lastCode.current = base64Code;
    return dispatch(scan(base64Code) as unknown as Action);
  };

  return (
    <div id="admin-entry">
      <div className="scan">
        <Title level={2}>Scanner une place</Title>
        <div className="entry-content">
          <Card className={scannedUser ? '' : 'borderless'}>
            {!scannedUser ? (
              <div className="scanner">
                <div className="scanner-placeholder">
                  <Icon name="camera" />
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
                  {scannedUser.age === UserAge.child && <Icon name="caution" />}
                  <strong>Âge :</strong> {scannedUser.age === UserAge.child ? 'Mineur' : 'Majeur'}
                </p>
                <p>
                  <strong>Type :</strong>{' '}
                  {scannedUser.type === UserType.player ? (
                    'Joueur'
                  ) : scannedUser.type === UserType.coach ? (
                    'Coach/Manager'
                  ) : scannedUser.type === UserType.spectator ? (
                    'Spectateur'
                  ) : scannedUser.type === UserType.orga ? (
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
                  {scannedUser.customMessage && <Icon name="caution" />}
                  <strong>Infos complémentaires :</strong>{' '}
                  {scannedUser.customMessage || (
                    <>
                      <em className="default">Aucune information particulière</em>
                    </>
                  )}
                </p>
                {scannedUser.attendant?.id && (
                  <p>
                    <strong>Accompagnateur :</strong> {scannedUser.attendant.firstname} {scannedUser.attendant.lastname}
                  </p>
                )}
                <p>
                  <strong>Payé :</strong> {scannedUser.hasPaid ? 'Oui' : 'Non'}
                </p>
                <div className="buttonRow">
                  <Button
                    primary={true}
                    disabled={scannedUser.hasPaid}
                    onClick={() => dispatch(registerCashPayment() as unknown as Action)}>
                    Valider le paiement
                  </Button>
                  <Button
                    primary={true}
                    disabled={!scannedUser.hasPaid || !!scannedUser.scannedAt}
                    onClick={() => dispatch(bypassQrScan() as unknown as Action)}>
                    Valider l'entrée
                  </Button>
                </div>
              </>
            )}
          </Card>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              scannedUser ? dispatch(setSearchUser(null)) : dispatch(searchUser(userIdentifiable) as unknown as Action);
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
