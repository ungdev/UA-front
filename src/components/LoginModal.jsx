import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Modal, Button, Input } from './UI';
import { setLoginModalVisible } from '../modules/loginModal';
import { registerUser } from '../modules/register';
import { tryLogin, resetPassword } from '../modules/login';

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
  password: '',
};

const LoginModal = ({ isVisible }) => {
  const dispatch = useDispatch();

  // Get panel key value
  const [panel, setPanel] = useState('login');
  const [loginForm, setLoginForm] = useState(initialLogin);
  const [signupForm, setSignupForm] = useState(initialSignup);
  const [forgotEmail, setForgotEmail] = useState('');

  const login = async () => {
    if (await dispatch(tryLogin(loginForm))) {
      resetFields();
    }
  };

  const signup = async () => {
    if (await dispatch(registerUser(signupForm))) {
      resetFields();
    }
  };

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
    setPanel('login');
  };

  // Get modal title, content and action from panel key
  const body = {
    login: {
      title: 'Connexion',
      content: (
        <>
          <Input
            label="Pseudo / Email"
            value={loginForm.username}
            onChange={(value) => updateLogin('username', value)}
          />
          <Input
            label="Mot de passe"
            value={loginForm.password}
            onChange={(value) => updateLogin('password', value)}
            type="password"
            autocomplete="password"
          />

          <p>
            <a onClick={() => setPanel('forgot')}>Mot de passe oublié ?</a>
          </p>
          <Button primary className="login-modal-button" type="submit">
            Se connecter
          </Button>

          <div className="footer-text">
            Pas encore inscrit ? <a onClick={() => setPanel('signup')}>Créer un compte</a>
          </div>
        </>
      ),
      action: login,
    },
    signup: {
      title: 'Inscription',
      content: (
        <>
          <Input
            label="Prénom"
            value={signupForm.firstname}
            onChange={(value) => updateSignup('firstname', value)}
            autocomplete="given-name"
          />
          <Input
            label="Nom"
            value={signupForm.lastname}
            onChange={(value) => updateSignup('lastname', value)}
            autocomplete="family-name"
          />
          <Input
            label="Pseudo (Nom d'invocateur pour LoL)"
            value={signupForm.username}
            onChange={(value) => updateSignup('username', value)}
            autocomplete="nickname"
          />
          <Input
            label="Email"
            value={signupForm.email}
            onChange={(value) => updateSignup('email', value)}
            type="email"
            autocomplete="email"
          />
          <Input
            label="Mot de passe"
            value={signupForm.password}
            onChange={(value) => updateSignup('password', value)}
            type="password"
            autocomplete="password"
          />
          <Input
            label="Confirmez le mot de passe"
            value={signupForm.passwordConfirmation}
            onChange={(value) => updateSignup('passwordConfirmation', value)}
            type="password"
            autocomplete="new-password"
          />
          <Button primary className="signup-modal-button" type="submit">
            S'inscrire
          </Button>

          <div className="footer-text">
            Déjà inscrit ? <a onClick={() => setPanel('login')}>Connecte-toi</a>
          </div>
        </>
      ),
      action: signup,
    },
    forgot: {
      title: 'Mot de passe oublié',
      content: (
        <>
          <Input label="Email" value={forgotEmail} onChange={setForgotEmail} type="email" autocomplete="email" />

          <Button primary onClick={() => dispatch(resetPassword(forgotEmail, resetFields))} type="submit">
            Envoyer
          </Button>

          <div className="footer-text">
            <a onClick={() => setPanel('login')}>Se connecter</a>
          </div>
        </>
      ),
      action: () => {},
    },
  };

  return (
    <Modal
      title="Inscription"
      visible={isVisible}
      buttons={null}
      onCancel={() => {
        dispatch(setLoginModalVisible(false));
      }}
      className="login-modal">
      Les inscriptions ouvriront bientôt, suivez-nous sur les réseaux sociaux !
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
