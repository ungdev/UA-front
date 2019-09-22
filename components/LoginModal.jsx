import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { Modal, Button, Input } from './UI';
import { setLoginModalVisible } from '../modules/loginModal';

import './LoginModal.css';

const LoginModal = ({ isVisible }) => {
  const dispatch = useDispatch();

  // Get panel key value
  const [panel, setPanel] = useState('login');

  // Get login fields value
  const login = {
    email: null, setEmail: null,
    password: null, setPassword: null,
  };

  [login.email, login.setEmail] = useState('');
  [login.password, login.setPassword] = useState('');

  // Get signup fields value
  const signup = {
    firstname: null, setFirstname: null,
    lastname: null, setLastname: null,
    nickname: null, setNickname: null,
    email: null, setEmail: null,
    password: null, setPassword: null,
    passwordConfirmation: null, setPasswordConfirmation: null,
  };

  [signup.nickname, signup.setNickname] = useState('');
  [signup.lastname, signup.setLastname] = useState('');
  [signup.firstname, signup.setFirstname] = useState('');
  [signup.email, signup.setEmail] = useState('');
  [signup.password, signup.setPassword] = useState('');
  [signup.passwordConfirmation, signup.setPasswordConfirmation] = useState('');

  // Get forgot password field value
  const forgot = {
    email: null, setEmail: null,
  };

  [forgot.email, forgot.setEmail] = useState('');

  // Get modal title and content from panel key
  let title, content;

  if(panel === 'login') {
    title = 'Connexion';

    content = (
      <>
        <Input
          label="Email"
          value={login.email}
          onChange={login.setEmail}
        />
        <Input
          label="Mot de passe"
          value={login.password}
          onChange={login.setPassword}
          type="password"
        />

        <p>
          <a onClick={() => setPanel('forgot')}>Mot de passe oublié ?</a>
        </p>

        <Link href="/dashboard">
          <Button
            primary
            onClick={() => dispatch(setLoginModalVisible(false))}
            className="login-modal-button"
          >
            Se connecter
          </Button>
        </Link>

        <div className="footer-text">
          Pas encore inscrit ? <a onClick={() => setPanel('signup')}>Créer un compte</a>
        </div>
      </>
    );
  }
  else if(panel === 'signup') {
    title = 'Inscription';

    content = (
      <>
        <Input
          label="Prénom"
          value={signup.firstname}
          onChange={signup.setFirstname}
        />
        <Input
          label="Nom"
          value={signup.lastname}
          onChange={signup.setLastname}
        />
        <Input
          label="Pseudo"
          value={signup.nickname}
          onChange={signup.setNickname}
        />
        <Input
          label="Email"
          value={signup.email}
          onChange={signup.setEmail}
        />
        <Input
          label="Mot de passe"
          value={signup.password}
          onChange={signup.setPassword}
          type="password"
        />
        <Input
          label="Confirmez le mot de passe"
          value={signup.passwordConfirmation}
          onChange={signup.setPasswordConfirmation}
          type="password"
        />

        <Link href="/">
          <Button
            primary
            onClick={() => dispatch(setLoginModalVisible(false))}
            className="signup-modal-button"
          >
            S'inscrire
          </Button>
        </Link>

        <div className="footer-text">
          Déjà inscrit ? <a onClick={() => setPanel('login')}>Connecte-toi</a>
        </div>
      </>
    );
  }
  else if(panel === 'forgot') {
    title = 'Mot de passe oublié';

    content = (
      <>
        <Input
          label="Email"
          value={forgot.email}
          onChange={forgot.setEmail}
        />

        <Button
          primary
          onClick={() => setPanel('login')}
          className="forgot-modal-button"
        >
          Suivant
        </Button>

        <div className="footer-text">
          <a onClick={() => setPanel('login')}>Se connecter</a>
        </div>
      </>
    );
  }

  return (
    <Modal
      title={title}
      visible={isVisible}
      isVisible={isVisible}
      buttons={null}
      onCancel={() => {
        dispatch(setLoginModalVisible(false));
        setPanel('login');
      }}
      className="login-modal"
    >
      {content}
    </Modal>
  );
};

LoginModal.propTypes = {
  /**
   * Is the modal visible ?
   */
  isVisible: PropTypes.bool.isRequired,
};

export default LoginModal;
