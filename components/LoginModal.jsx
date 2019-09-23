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
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  // Get signup fields value
  const [signup, setSignup] = useState({
    firstname: '',
    lastname: '',
    nickname: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  // Get forgot email field value
  const [forgotEmail, setForgotEmail] = useState('');

  // Get modal title and content from panel key
  let title, content;

  if(panel === 'login') {
    title = 'Connexion';

    content = (
      <>
        <Input
          label="Email"
          value={login.email}
          onChange={(email) => setLogin({ ...login, email })}
        />
        <Input
          label="Mot de passe"
          value={login.password}
          onChange={(password) => setLogin({ ...login, password })}
          type="password"
        />

        <p>
          <a tabIndex="0" onClick={() => setPanel('forgot')}>Mot de passe oublié ?</a>
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
          Pas encore inscrit ? <a tabIndex="0" onClick={() => setPanel('signup')}>Créer un compte</a>
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
          onChange={(firstname) => setSignup({ ...signup, firstname })}
        />
        <Input
          label="Nom"
          value={signup.lastname}
          onChange={(lastname) => setSignup({ ...signup, lastname })}
        />
        <Input
          label="Pseudo"
          value={signup.nickname}
          onChange={(nickname) => setSignup({ ...signup, nickname })}
        />
        <Input
          label="Email"
          value={signup.email}
          onChange={(email) => setSignup({ ...signup, email })}
        />
        <Input
          label="Mot de passe"
          value={signup.password}
          onChange={(password) => setSignup({ ...signup, password })}
          type="password"
        />
        <Input
          label="Confirmez le mot de passe"
          value={signup.passwordConfirmation}
          onChange={(passwordConfirmation) => setSignup({ ...signup, passwordConfirmation })}
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
          Déjà inscrit ? <a tabIndex="0" onClick={() => setPanel('login')}>Connecte-toi</a>
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
          value={forgotEmail}
          onChange={setForgotEmail}
        />

        <div className="forgot-modal-buttons">
          <Button onClick={() => setPanel('login')}>Retour</Button>
          <Button primary onClick={() => setPanel('login')}>Suivant</Button>
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
