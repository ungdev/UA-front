import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import { Input, Button, Title } from '../../components/UI';
import { editUser } from '../../modules/login';
import { API } from '../../utils/api';
import { apiUrl } from '../../utils/environment';

const Account = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);

  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [username, setUsername] = useState(user.username);
  const [oldpassword, setOldpassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [discordLink, setDiscordLink] = useState('');

  useEffect(() => {
    API.get('discord/connect').then((res) => {
      setDiscordLink(res.data.link);
    });
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
      {/* user.hasPaid && (
        <>
          <div className="ticket">
            <Title level={4}>Mon billet</Title>
            <Button primary onClick={downloadTicket}>
              Télécharger mon billet
            </Button>
          </div>
          <hr />
        </>
      )*/}
      <div className="infos">
        <Title level={4}>Mes informations</Title>

        <Input label="Place" value={user.place} autocomplete="off" disabled />
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

        {user.discordId ? (
          <p>
            Tu es connecté à ton compte Discord ! <i className="fas fa-check green-icon" />
          </p>
        ) : (
          ''
        )}

        <p>
          <a className="discord-button" href={discordLink}>
            {user.discordId ? 'Change ton compte Discord' : 'Connecte-toi à ton compte Discord'}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Account;
