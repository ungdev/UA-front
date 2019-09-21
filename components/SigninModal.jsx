import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

import Modal from './UI/Modal';
import Button from './UI/Button';
import Input from './UI/Input';

import { setVisible } from '../modules/loginModal';

import './SigninModal.css';

const SigninModal = ({ isVisible }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordBis, setPasswordBis] = useState('');
  const [isSignin, setIsSignin] = useState(true);

  const footerSignin = (
    <>
      <Link href="/dashboard">
        <Button onClick={() => dispatch(setVisible(false))} primary>Se connecter</Button>
      </Link>
      <div>Pas encore inscrit?{' '}
        <a className="modal-link" onClick={() => setIsSignin(false)}>Inscrit toi maintenant</a>
      </div>
    </>
  );
  const footerSignup = (
    <>
      <Link href="/">
        <Button primary onClick={() => dispatch(setVisible(false))}>S'inscrire</Button>
      </Link>
      <div>Déjà inscrit?{' '}
        <a className="modal-link" onClick={() => setIsSignin(true)}>Connecte-toi</a>
      </div>
    </>
  );

  const contentSignin = (
    <>
      <Input label="Email" value={email} onChange={setEmail} />
      <Input label="Mot de passe" value={password} onChange={setPassword} type="password" />
      <p>Mot de passe oublié?</p>
    </>
  );

  const contentSignup = (
    <>
      <Input label="Email" value={email} onChange={setEmail} />
      <Input label="Pseudo (en jeu)" value={nickname} onChange={setNickname} />
      <Input label="Nom" value={lastname} onChange={setLastname} />
      <Input label="Prénom" value={firstname} onChange={setFirstname} />
      <Input label="Mot de passe" value={password} onChange={setPassword} type="password" />
      <Input label="Répétez le mot de passe" value={passwordBis} onChange={setPasswordBis} type="password" />

    </>
  );

  return (
    <Modal
      title={isSignin ? 'Connexion' : 'Inscription'}
      visible={isVisible}
      onCancel={() => dispatch(setVisible(false))}
      isVisible={isVisible}
      footer={isSignin ? footerSignin : footerSignup}
    >
      {isSignin ? contentSignin : contentSignup}
    </Modal>
  );
};

export default SigninModal;
