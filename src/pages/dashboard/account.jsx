import React, { useState } from 'react';
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

  const edit = () => {
    if (password === confirmPassword) {
      const data = {
        firstname,
        lastname,
        username,
      };

      if (oldpassword !== '' && password !== '') {
        data.oldpassword = oldpassword;
        data.password = password;
      }

      dispatch(editUser(data, user.id));

      // Reset password fields
      setOldpassword('');
      setPassword('');
      setConfirmPassword('');
    } else {
      toast.error('Les mots de passe ne correspondent pas');
    }
  };

  const downloadTicket = async () => {
    const res = await API.get(`${apiUrl()}users/${user.id}/ticket`);

    let element = document.createElement('a');
    element.href = 'data:application/pdf;base64,' + res.data;
    element.download = 'Billet UTT Arena 2019.pdf';
    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div id="dashboard-account">
      <div className="notif">
        <Title level={4}>Notifications</Title>
        <p>
          N'hésite pas à activer les notifications pour recevoir en temps réel les dernières informations sur ton
          tournoi et sur la LAN.
          <br />
          <strong>Pense à désactiver ton bloqueur de pub préféré.</strong>
          <br />
          Les notifications ne seront utilisées que pendant l'événement.
        </p>
      </div>
      <hr />

      {user.isPaid && (
        <>
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

        <Input label="Place" value={user.place} autocomplete="off" disabled />
        <Input label="Email" value={user.email} autocomplete="off" disabled />
        <Input label="Prénom" value={firstname} onChange={setFirstname} autocomplete="off" />
        <Input label="Nom" value={lastname} onChange={setLastname} autocomplete="off" />
        <Input label="Pseudo (Nom d'invocateur pour LoL)" value={username} onChange={setUsername} autocomplete="off" />
        <Input
          label="Mot de passe actuel"
          value={oldpassword}
          onChange={setOldpassword}
          autocomplete="off"
          type="password"
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

        <Button primary onClick={edit}>
          Modifier
        </Button>
      </div>
    </div>
  );
};

export default Account;
