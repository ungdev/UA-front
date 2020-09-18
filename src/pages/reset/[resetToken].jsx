import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { Input, Button, Title } from '../../components/UI';
import { API } from '../../utils';

const Reset = () => {
  const router = useRouter();
  const { resetToken } = router.query;
  const [password, setPassword] = useState('');
  const [passwordBis, setPasswordBis] = useState('');
  const reset = async () => {
    await API.put('auth/password/update', { resetToken, password });
    toast.success('Mot de passe réinitialisé');
    router.push('/');
  };

  if (!resetToken) {
    toast.error('Token inexistant');
    router.replace('/');
  }

  return (
    <div>
      <Title level={3}>Réinitialiser le mot de passe</Title>
      <Input value={password} onChange={setPassword} label="Nouveau mot de passe" type="password" />
      <Input value={passwordBis} onChange={setPasswordBis} label="Confirmer nouveau mot de passe" type="password" />
      <Button
        primary
        onClick={() => {
          if (password !== passwordBis) {
            toast.error('Les deux mots de passe ne sont pas identiques');
          } else {
            reset();
          }
        }}>
        Modifier
      </Button>
    </div>
  );
};

export default Reset;
