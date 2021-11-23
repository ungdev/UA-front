import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import { Input, Button, Title, Collapse } from '../../components/UI';
import { editUser } from '../../modules/login';
import { API } from '../../utils/api';
import { fetchCurrentTeam } from '../../modules/team';

const Account = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const team = useSelector((state) => state.team);

  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [username, setUsername] = useState(user.username);
  const [oldpassword, setOldpassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [discordLink, setDiscordLink] = useState('');
  const discordLinkRef = useRef(null);

  useEffect(() => {
    API.get('discord/connect').then((res) => {
      setDiscordLink(res.data.link);
    });
    // Scroll to discord section (as it may be below information section)
    if (window.location.href.endsWith('#discord')) discordLinkRef.current.scrollIntoView();
  }, []);

  useEffect(() => {
    user && user.teamId && dispatch(fetchCurrentTeam());
  }, []);

  const edit = () => {
    if (password && password !== confirmPassword) return toast.error('Les mots de passe ne correspondent pas');
    else if (oldpassword) {
      const data = {
        username: username,
        password: oldpassword,
        newPassword: password,
      };

      // Remove null fields from `data`
      for (const key in data) if (!data[key]) delete data[key];

      // Stop request if the user only filled the `oldPassword`
      if (Object.keys(data).length < 2) {
        toast.error('Si tu veux modifier ton compte, mets à jour une information');
      } else {
        // Send the request to the api
        dispatch(editUser(data, user.id));

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
    const res = await API.get(`tickets`);

    let element = document.createElement('a');
    element.href = `data:application/pdf;base64,${res.data}`;
    element.download = 'Billet UTT Arena 2021.pdf';
    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div id="dashboard-account">
      {user.hasPaid && ((user.type !== 'coach' && user.type !== 'player') || (team && team.lockedAt)) && (
        <>
          <div className="to-bring">
            <Title level={4}>Ce que tu dois apporter le jour de l'UA</Title>
            <Collapse title="Pour te restaurer">
              <ul>
                <li>Gourde</li>
                <li>Tupperware</li>
                <li>
                  Apporter de la nourriture est <strong>interdit</strong>
                </li>
              </ul>
            </Collapse>
            <Collapse title="Pour rentrer dans l'espace Argence">
              <ul>
                <li>Ton pass sanitaire</li>
                <li>Ton billet</li>
                <li>Ta pièce d’identité</li>
                {user.age === 'child' && <li>Une attestation parentale</li>}
              </ul>
            </Collapse>
            <Collapse title="Pour jouer">
              <ul>
                <li>
                  Une multiprise : il n'y a qu'une seule prise par joueur donc si tu veux brancher plusieurs choses,
                  elle sera ta meilleure amie
                </li>
                <li>Un câble ethernet</li>
                <li>
                  Ton setup complet (sauf si tu l'as loué) :
                  <ul>
                    <li>Tour</li>
                    <li>Écran</li>
                    <li>Câble HDMI / VGA</li>
                    <li>Souris</li>
                    <li>Clavier</li>
                    <li>Manette</li>
                  </ul>
                </li>
                <li>Si tu as pris la réduction SSBU, ta Switch</li>
              </ul>
            </Collapse>
            <Collapse
              title={
                <span>
                  D'autres trucs qui <del>pourraient</del> <strong>te seront</strong> utiles
                </span>
              }>
              <ul>
                <li>De quoi te laver</li>
                <li>De quoi dormir</li>
                <li>
                  Des masques : prends en plusieurs, ça peut toujours casser, et on n'en aura pas forcément en rab ! Pas
                  de masque, pas de LAN !
                </li>
              </ul>
            </Collapse>
          </div>
          <hr />
          <div className="ticket">
            <Title level={4}>Mon billet</Title>
            <Button primary onClick={downloadTicket}>
              Télécharger mon billet
            </Button>
          </div>
          <hr />
        </>
      )}
      <div className="infos">
        <Title level={4}>Mes informations</Title>

        <Input label="Place" value={user.place || ''} autocomplete="off" disabled />
        <Input label="Email" value={user.email} autocomplete="off" disabled />
        <Input label="Prénom" value={firstname} onChange={setFirstname} autocomplete="off" disabled />
        <Input label="Nom" value={lastname} onChange={setLastname} autocomplete="off" disabled />
        <Input label="Pseudo (Nom d'invocateur pour LoL)" value={username} onChange={setUsername} autocomplete="off" />
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

      <div className="infos" ref={discordLinkRef}>
        <Title level={4}>Mon compte Discord</Title>
        {user.discordId ? (
          <p>
            Tu es connecté à ton compte Discord ! <span className="fas fa-check green-icon" />
          </p>
        ) : (
          ''
        )}
        <a href={discordLink}>
          <Button primary>{user.discordId ? 'Change ton compte Discord' : 'Connecte-toi à ton compte Discord'}</Button>
        </a>
      </div>
      {user.compumsaCode ? (
        <div>
          <Title level={4}>Code de réduction Compumsa</Title>
          Remise/min. d'achat sur www.compumsa.eu : 15 €/50 € ; 20 €/150 € et 30 €/300 € Le meilleur e-commerce IT en
          Belgique et un des meilleurs en Europe ! Bon de réduction pour la UTT Arena. Valable jusqu'au 30/06/2022, 1
          bon max par personne. Envoyez un email avant de commander en indiquant votre code personnel :{' '}
          <b>{user.compumsaCode}</b>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Account;
