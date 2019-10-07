import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import { Input, Button } from '../../components/UI';
import { editUser } from '../../modules/login';

import './account.css';

const Account = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);

  const [firstname,setFirstname] = useState(user.firstname);
  const [lastname,setLastname] = useState(user.lastname);
  const [username,setUsername] = useState(user.username);
  const [oldpassword,setOldpassword] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');

  const edit = () => {
    if ( password === confirmPassword ) {
      const data = oldpassword !== ''  && password !== '' ? { firstname,lastname,username,oldpassword,password,email: user.email } : { firstname,lastname,username,email: user.email };
      dispatch(editUser(data, user.id));
    }else {
      toast.error('Les mots de passe ne correspondent pas');
    }
  };

  return (
    <div id="dashboard-account">
      <div className="infos">
        <p>Email : <br/>{user.email}</p>
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
