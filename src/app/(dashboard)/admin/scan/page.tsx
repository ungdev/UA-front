'use client';
import styles from './style.module.scss';
import { useState, useRef } from 'react';

import { bypassQrScan, registerCashPayment, scan, searchUser, setSearchUser } from '@/modules/userEntry';
import { Input, Title, Button, QRCodeReader, Icon } from '@/components/UI/index';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import type { Action } from '@reduxjs/toolkit';
import { UserAge, UserType } from '@/types';
import QrScanner from 'qr-scanner';
import { IconName } from '@/components/UI/Icon';

const Entry = () => {
  const scannedUser = useAppSelector((state) => state.userEntry.searchUser);
  const [userIdentifiable, setUserIdentifiable] = useState<string>('');
  const lastCode = useRef<string>();
  const dispatch = useAppDispatch();

  const onCodeScanned = (code: QrScanner.ScanResult) => {
    const base64Code = window.btoa(code.data);
    if (scannedUser || base64Code === lastCode.current) return;
    lastCode.current = base64Code;
    return dispatch(scan(base64Code) as unknown as Action);
  };

  return (
    <div id="admin-entry" className={styles.adminEntry}>
      <div className={styles.scan}>
        <Title level={2} type={1}>
          Scanner une place
        </Title>
        <div>
          {!scannedUser ? (
            <div className={styles.scanner}>
              <div className={styles.scannerPlaceholder}>
                <Icon name={IconName.Camera} />
                Veuillez activer votre caméra
              </div>
              <QRCodeReader onCode={(code) => onCodeScanned(code)} className={styles.scannerPreview}></QRCodeReader>
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
                {scannedUser.age === UserAge.child && <Icon name={IconName.Caution} />}
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
                  <em className={styles.default}>Mais qui est cette étrange personne ?!</em>
                )}
              </p>
              <p>
                <strong>Équipe :</strong>{' '}
                {scannedUser.team?.name ?? (
                  <>
                    <em className={styles.default}>L'utilisateur n'est pas dans une équipe</em>
                  </>
                )}
              </p>
              <p>
                <strong>Tournoi :</strong>{' '}
                {scannedUser.team?.tournament.name ?? (
                  <>
                    <em className={styles.default}>L'utilisateur n'est pas inscrit à un tournoi !</em>
                  </>
                )}
              </p>
              <p>
                <strong>Place :</strong>{' '}
                {scannedUser.place ?? (
                  <>
                    <em className={styles.default}>L'utilisateur n'a pas de place attribuée</em>
                  </>
                )}
              </p>
              <p>
                {scannedUser.customMessage && <Icon name={IconName.Caution} />}
                <strong>Infos complémentaires :</strong>{' '}
                {scannedUser.customMessage || (
                  <>
                    <em className={styles.default}>Aucune information particulière</em>
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
              <div className={styles.buttonRow}>
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
          <hr />
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
            <Button primary type="submit">
              {scannedUser ? 'Scanner un autre billet' : "Rechercher l'utilisateur"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Entry;
