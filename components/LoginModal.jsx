import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Modal, Button, Input } from './UI';
import { setLoginModalVisible } from '../modules/loginModal';
import { tryLogin } from '../modules/login';
import { register } from '../modules/register';

import './LoginModal.css';

const initialSignup = {
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

const initialLogin = {
  username: '',
  password: ''
};

const LoginModal = ({ isVisible }) => {
  const dispatch = useDispatch();
  // Get panel key value
  const [panel, setPanel] = useState('login');

  const [loginForm, setLoginForm] = useState(initialLogin);

  const [signupForm, setSignupForm] = useState(initialSignup);

  const [forgotEmail, setForgotEmail] = useState('');

  const updateLogin = (field, value) => {
    setLoginForm({
      ...loginForm,
      [field]: value,
    });
  };

  const updateSignup = (field, value) => {
    setSignupForm({
      ...signupForm,
      [field]: value,
    });
  };

  const resetFields = () => {
    setLoginForm(initialLogin);
    setSignupForm(initialSignup);
  };

  // Get modal title and content from panel key
  let title, content;

  if(panel === 'login') {
    title = 'Connexion';

    content = (
      <>
        <Input
          label="Email"
          value={loginForm.username}
          onChange={(value) => updateLogin('username', value)}
        />
        <Input
          label="Mot de passe"
          value={loginForm.password}
          onChange={(value) => updateLogin('password', value)}
          type="password"
        />

        <p>
          <a onClick={() => setPanel('forgot')}>Mot de passe oublié ?</a>
        </p>
        <Button
          primary
          onClick={async () => {
            if (await dispatch(tryLogin(loginForm))) {
              resetFields();
            }
          }}
          className="login-modal-button"
        >
          Se connecter
        </Button>

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
          value={signupForm.firstname}
          onChange={(value) => updateSignup('firstname', value)}
        />
        <Input
          label="Nom"
          value={signupForm.lastname}
          onChange={(value) => updateSignup('lastname', value)}
        />
        <Input
          label="Pseudo"
          value={signupForm.username}
          onChange={(value) => updateSignup('username', value)}
        />
        <Input
          label="Email"
          value={signupForm.email}
          onChange={(value) => updateSignup('email', value)}
        />
        <Input
          label="Mot de passe"
          value={signupForm.password}
          onChange={(value) => updateSignup('password', value)}
          type="password"
        />
        <Input
          label="Confirmez le mot de passe"
          value={signupForm.passwordConfirmation}
          onChange={(value) => updateSignup('passwordConfirmation', value)}
          type="password"
        />
        <Button
          primary
          onClick={async () => {
            if (await dispatch(register(signupForm))) {
              resetFields();
            }
          }}
          className="signup-modal-button"
        >
          S'inscrire
        </Button>

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
          value={forgotEmail}
          onChange={setForgotEmail}
        />

        <Button
          primary
          onClick={() => setPanel('login')}
          className="forgot-modal-button"
        >
          Envoyer
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
