'use client';
import styles from './style.module.scss';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';

import { Input, Button, Title, Icon, Collapse } from '@/components/UI';
import { editUser } from '@/modules/login';
import { API } from '@/utils/api';
import { fetchCurrentTeam } from '@/modules/team';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { UserAge, UserEdit, UserType } from '@/types';
import { IconName } from '@/components/UI/Icon';

const Account = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.login.user)!;
  const team = useAppSelector((state) => state.team.team);
  const areTicketsAllowed = useAppSelector((state) => state.settings.tickets);

  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [username, setUsername] = useState(user.username);
  const [oldpassword, setOldpassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [discordLink, setDiscordLink] = useState('');
  const discordLinkRef = useRef<HTMLDivElement>(null);
  const [displayTicket, setDisplayTicket] = useState(false);

  useEffect(() => {
    API.get('discord/connect').then((res) => {
      setDiscordLink(res.link);
    });
    // Scroll to discord section (as it may be below information section)
    if (window.location.href.endsWith('#discord')) discordLinkRef.current!.scrollIntoView();
  }, []);

  useEffect(() => {
    setDisplayTicket(
      (areTicketsAllowed &&
        user.hasPaid &&
        ((user.type !== UserType.coach && user.type !== UserType.player) || (team && team.lockedAt))) as boolean,
    );
  }, [team]);

  useEffect(() => {
    if (user.teamId) {
      dispatch(fetchCurrentTeam());
    }
  }, []);

  const edit = () => {
    if (password && password !== confirmPassword) return toast.error('Les mots de passe ne correspondent pas');
    else if (oldpassword) {
      const data = {
        username: username,
        password: oldpassword,
        newPassword: password,
      } as Record<string, string>;

      // Remove null fields from `data`
      Object.keys(data).forEach((key) => data[key] === null && delete data[key]);

      // Remove empty fields from `data`
      Object.keys(data).forEach((key) => data[key] === '' && delete data[key]);

      // Stop request if the user only filled the `oldPassword`
      if (Object.keys(data).length < 2) {
        toast.error('Si tu veux modifier ton compte, mets à jour une information');
      } else {
        // Send the request to the api
        dispatch(editUser(data as unknown as UserEdit));

        // Reset password fields
        setOldpassword('');
        setPassword('');
        setConfirmPassword('');
      }
    } else {
      toast.error('Tu dois rentrer ton mot de passe actuel pour modifier ces informations');
    }
  };

  const downloadTicket = async () => {
    const response = await API.get(`tickets`);

    const data = window.URL.createObjectURL(response);
    const link = document.createElement('a');
    link.href = data;
    link.download = 'Billet UTT Arena 2024.pdf';
    link.click();
  };

  return (
    <div id="dashboard-account" className={styles.dashboardAccount}>
      <div className={styles.infos}>
        <Title level={4} align="center" className={styles.secondaryTitle}>
          Mes informations
        </Title>

        <Input label="Place" value={user.place || ''} autocomplete="off" disabled />
        <Input label="Email" value={user.email} autocomplete="off" disabled />
        <Input label="Prénom" value={firstname} onChange={setFirstname} autocomplete="off" disabled />
        <Input label="Nom" value={lastname} onChange={setLastname} autocomplete="off" disabled />
        <Input
          label="Pseudo (Nom d'invocateur pour LoL avec #)"
          value={username}
          onChange={setUsername}
          autocomplete="off"
        />
        <Input
          label="Nouveau mot de passe"
          value={password}
          onChange={setPassword}
          autocomplete="off"
          type="password"
        />
        <Input
          label="Confirmer le nouveau mot de passe"
          value={confirmPassword}
          onChange={setConfirmPassword}
          autocomplete="off"
          type="password"
        />

        <br />
        <Input
          label="Pour modifier ton profil, entre ton mot de passe actuel"
          value={oldpassword}
          onChange={setOldpassword}
          autocomplete="off"
          type="password"
        />

        <Button primary onClick={edit}>
          Modifier
        </Button>
      </div>
      <div className={styles.infos} ref={discordLinkRef}>
        <Title level={4} align="center" className={styles.secondaryTitle}>
          Mon compte Discord
        </Title>
        <div className={styles.discordCategory}>
          {user.discordId ? (
            <p>
              Tu es connecté à ton compte Discord ! <span className="fas fa-check" />
            </p>
          ) : (
            ''
          )}
          <a href={discordLink}>
            <Button primary veryLong>
              <Icon name={IconName.Discord} fill={true} />
              {user.discordId ? 'Change ton compte Discord' : 'Connecte-toi à ton compte Discord'}
            </Button>
          </a>
        </div>
        {displayTicket && (
          <div className={styles.ticket}>
            <Title level={4} align="center">
              Mon billet
            </Title>
            <Button primary veryLong onClick={downloadTicket}>
              Télécharger mon billet
            </Button>
          </div>
        )}
      </div>
      {displayTicket && (
        <div className="to-bring">
          <Title level={4} align="center">
            Ce que tu dois apporter le jour de l'UA
          </Title>
          <Collapse title="Pour te restaurer" initVisible={true}>
            <ul>
              <li>
                Gourde <strong>vide</strong>
              </li>
              <li>
                Apporter de la nourriture ou de la boisson est <strong>interdit</strong>
              </li>
            </ul>
          </Collapse>
          <Collapse title="Pour rentrer dans la Halle Sportive" initVisible={true}>
            <ul>
              <li>Ton billet</li>
              <li>Ta pièce d’identité</li>
              {user.age === UserAge.child && <li>Une attestation parentale et les documents demandés dessus</li>}
            </ul>
          </Collapse>
          <Collapse title="Pour jouer" initVisible={true}>
            <ul>
              <li>
                Une multiprise : il n'y a qu'une seule prise par joueur donc si tu veux brancher plusieurs choses, elle
                sera ta meilleure amie
              </li>
              <li>Un câble ethernet (7m)</li>
              <li>
                Ton setup complet :
                <ul>
                  <li>Tour</li>
                  <li>Écran</li>
                  <li>Câble HDMI / VGA</li>
                  <li>Souris</li>
                  <li>Clavier</li>
                  <li>Manette</li>
                </ul>
              </li>
              {team && team.tournamentId === 'ssbu' && (
                <li>
                  Si tu as pris la réduction SSBU, ta Switch, le jeu SSBU avec tous les personnages et un câble HDMI
                </li>
              )}
            </ul>
          </Collapse>
        </div>
      )}
    </div>
  );
};

export default Account;
