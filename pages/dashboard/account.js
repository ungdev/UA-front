import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { Input, Button } from '../../components/UI';
import { API } from '../../utils';
import errorToString from '../../utils/errorToString';

import './account.css';

const Account = () => {

  const edit = async () => {

    try{
      if ( password === confirmPassword ) {
        const data = oldpassword !== ''  && password !== '' ? { firstname,lastname,username,email,oldpassword, password} : { firstname,lastname,username,email };
        await API().put(`/users/${userId}`, data);
        toast('Informations sauvegardées');
      }
      else {
        toast('Les mots de passe ne correspondent pas');
      }
    }
    catch (err) {
      console.error(err);
      toast.error(errorToString(err.response.data.error));
    }


  };

  const [firstname,setFirstname] = useState(useSelector((state) => state.login.user.firstname));
  const [lastname,setLastname] = useState(useSelector((state) => state.login.user.lastname));
  const [username,setUsername] = useState(useSelector((state) => state.login.user.username));
  const [email,setEmail] = useState(useSelector((state) => state.login.user.email));
  const [oldpassword,setOldpassword] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const userId = useSelector((state) => state.login.user.id);

  return (
    <div id="dashboard-account">
      <div className="infos">
        <Input
          label="Prénom"
          value={firstname}
          onChange={setFirstname}
        />
        <Input
          label="Nom"
          value={lastname}
          onChange={setLastname}
        />
        <Input
          label="Pseudo"
          value={username}
          onChange={setUsername}
        />
        <Input
          label="Email"
          value={email}
          onChange={setEmail}
        />
        <Input
          label="Mot de passe actuel"
          value={oldpassword}
          onChange={setOldpassword}
          type="password"
        />
        <Input
          label="Nouveau mot de passe"
          value={password}
          onChange={setPassword}
          type="password"
        />
        <Input
          label="Confirmer le nouveau mot de passe"
          value={confirmPassword}
          onChange={setConfirmPassword}
          type="password"
        />
        <Button primary onClick={edit}>Modifier</Button>
        </div>
      <div className="ticket">
        <p>Je ne sais pas quoi écrire ici pour l'instant, ni où le placer</p>
        <Button primary>Billet</Button>
      </div>
    </div>
  );
};

export default Account;
