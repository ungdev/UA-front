import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Modal, Button, Input, Checkbox } from './UI';
import { setLoginModalVisible } from '../modules/loginModal';
import { registerUser } from '../modules/register';
import { tryLogin, resetPassword } from '../modules/login';
import { toast } from 'react-toastify';

const initialSignup = {
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  isMinor: false,
  isAdult: false,
};

// TODO : Allow user to login with username
const initialLogin = {
  login: '',
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
          <Input label="Pseudo / Email" value={loginForm.login} onChange={(value) => updateLogin('login', value)} />
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
          <div className="age-label">Le 26 Novembre 2021, vous serez : </div>
          <Checkbox label="Mineur" value={signupForm.isMinor} onChange={(value) => updateSignup('isMinor', value)} />
          <Checkbox label="Majeur" value={signupForm.isAdult} onChange={(value) => updateSignup('isAdult', value)} />
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

          <Button
            primary
            onClick={() => dispatch(resetPassword(forgotEmail, resetFields))}
            className="forgot-modal-button"
            type="submit">
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
      title={body[panel].title}
      visible={isVisible}
      buttons={null}
      onCancel={() => {
        dispatch(setLoginModalVisible(false));
        resetFields();
      }}
      className="login-modal">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          body[panel].action();
        }}>
        {body[panel].content}
      </form>
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
