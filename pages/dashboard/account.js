import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import { Input, Button, Title } from '../../components/UI';
import { editUser } from '../../modules/login';
import { API } from '../../utils';

import './account.css';

const Account = () => {
  const sendTicket = async () => {
    await API().get('/user/ticket');
    toast.success('Ton billet a été envoyé par mail');
  };

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

      dispatch(editUser(data, user.email, user.id));

      // Reset password fields
      setOldpassword('');
      setPassword('');
      setConfirmPassword('');
    }
    else {
      toast.error('Les mots de passe ne correspondent pas');
    }
  };

  return (
    <div id="dashboard-account">
      <div className="infos">
        <Title level={4}>Mes informations</Title>

        <Input
          label="Email"
          value={user.email}
          autocomplete="off"
          disabled
        />
        <Input
          label="Prénom"
          value={firstname}
          onChange={setFirstname}
          autocomplete="off"
        />
        <Input
          label="Nom"
          value={lastname}
          onChange={setLastname}
          autocomplete="off"
        />
        <Input
          label="Pseudo"
          value={username}
          onChange={setUsername}
          autocomplete="off"
        />
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

        <Button primary onClick={edit}>Modifier</Button>
      </div>

      <div className="ticket">
        <Title level={4}>Mon billet</Title>
        <Button primary onClick={sendTicket}>Renvoyer par mail</Button>
      </div>
    </div>
  );
};

export default Account;