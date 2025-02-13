'use client';
import styles from './style.module.scss';
import { useState, useRef } from 'react';
import base45 from 'base45';
import { bypassQrScan, registerCashPayment, scan, searchUser, setSearchUser, leavePanel } from '@/modules/userEntry';
import { Input, Title, Button, QRCodeReader, Icon } from '@/components/UI/index';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { UserAge, UserType } from '@/types';
import { IconName } from '@/components/UI/Icon';

const Entry = () => {
  const scannedUser = useAppSelector((state) => state.userEntry.searchUser);
  const [userIdentifiable, setUserIdentifiable] = useState<string>('');
  const lastCode = useRef<string>();
  const dispatch = useAppDispatch();

  const onCodeScanned = (code: QRCodeResult) => {
    console.log('Donnée brute du QR code:', code.data);
    const binaryData = base45.decode(String(code.data));
    console.log('Donnée décodée du QR code:', binaryData);
    const base64Code = binaryData.toString('base64');
    console.log('Donnée en base64 du QR code:', base64Code);
    if (scannedUser || base64Code === lastCode.current) return;
    lastCode.current = base64Code;
    return dispatch(scan(base64Code));
  };

  return (
    <div id="admin-entry" className={styles.adminEntry}>
      <div className={styles.scan}>
        <Title level={2} type={1}>
          Scanner une place
        </Title>
        <div>
          {!scannedUser ? (
            <>
              <div className={styles.scanner}>
                <div className={styles.scannerPlaceholder}>
                  <Icon name={IconName.Camera} />
                  Veuillez activer votre caméra
                </div>
                <QRCodeReader onCode={(code) => onCodeScanned(code)} className={styles.scannerPreview}></QRCodeReader>
              </div>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (scannedUser) {
                    dispatch(setSearchUser(null));
                  } else {
                    dispatch(searchUser(userIdentifiable));
                  }
                }}>
                <>
                  <div>Saisie manuelle</div>
                  <Input
                    label="Entrer le mail de l'utilisateur"
                    onChange={setUserIdentifiable}
                    value={userIdentifiable}
                  />
                </>
                <Button primary type="submit">
                  {scannedUser ? 'Scanner un autre billet' : "Rechercher l'utilisateur"}
                </Button>
              </form>
            </>
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
                <Button primary={true} disabled={scannedUser.hasPaid} onClick={() => dispatch(registerCashPayment())}>
                  Valider le paiement et l'entrée
                </Button>
                <Button
                  primary={true}
                  disabled={!scannedUser.hasPaid || !!scannedUser.scannedAt}
                  onClick={() => dispatch(bypassQrScan())}>
                  Valider l'entrée
                </Button>
                <Button primary={true} onClick={() => dispatch(leavePanel())}>
                  Changer de personne
                </Button>
              </div>
            </>
          )}
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Entry;
