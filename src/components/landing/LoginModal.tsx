'use client';
import styles from './LoginModal.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Modal, Button, Input, Radio } from '@/components/UI';
import { setLoginModalVisible } from '@/modules/loginModal';
import { registerUser } from '@/modules/register';
import { tryLogin, resetPassword } from '@/modules/login';
import { type Action } from '@reduxjs/toolkit';

const initialSignup = {
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  age: '',
};

const initialLogin = {
  login: '',
  password: '',
};

/**
 * LoginModal component that displays a modal with login, signup and forgot password forms.
 */
function LoginModal({
  visible = false,
  admin = false,
}: {
  /** Determines whether the modal is visible or not. */
  visible?: boolean;
  /** Determines whether the modal is for the admin login or not. */
  admin?: boolean;
}) {
  const dispatch = useDispatch();

  // Get panel key value
  const [panel, setPanel] = useState('login');
  const [loginForm, setLoginForm] = useState(initialLogin);
  const [signupForm, setSignupForm] = useState(initialSignup);
  const [forgotEmail, setForgotEmail] = useState('');

  const login = () => {
    dispatch(tryLogin(loginForm, admin) as unknown as Action);
  };

  const signup = () => {
    dispatch(registerUser(signupForm) as unknown as Action);
  };

  const updateLogin = (field: string, value: string) => {
    setLoginForm({
      ...loginForm,
      [field]: value,
    });
  };

  const updateSignup = (field: string, value: string) => {
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

  useEffect(() => {
    if (visible) resetFields();
  }, [visible]);

  // Get modal title, content and action from panel key
  const body = {
    login: {
      title: 'Connexion',
      content: (
        <>
          <Input
            label="Pseudo / Email"
            value={loginForm.login}
            onChange={(value: string) => updateLogin('login', value)}
          />
          <Input
            label="Mot de passe"
            value={loginForm.password}
            onChange={(value: string) => updateLogin('password', value)}
            type="password"
            autocomplete="password"
          />

          <p>
            <a onClick={() => setPanel('forgot')}>Mot de passe oublié ?</a>
          </p>
          <Button primary className={styles.loginModalButton} type="submit">
            Se connecter
          </Button>

          <div className={styles.footerText}>
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
            onChange={(value: string) => updateSignup('firstname', value)}
            autocomplete="given-name"
          />
          <Input
            label="Nom"
            value={signupForm.lastname}
            onChange={(value: string) => updateSignup('lastname', value)}
            autocomplete="family-name"
          />
          <Input
            label="Pseudo (Nom d'invocateur pour LoL)"
            value={signupForm.username}
            onChange={(value: string) => updateSignup('username', value)}
            autocomplete="nickname"
          />
          <Input
            label="Email (utilise ton adresse étudiante si tu es dans une UT)"
            value={signupForm.email}
            onChange={(value: string) => updateSignup('email', value)}
            type="email"
            autocomplete="email"
          />
          <Input
            label="Mot de passe"
            value={signupForm.password}
            onChange={(value: string) => updateSignup('password', value)}
            type="password"
            autocomplete="password"
          />
          <Input
            label="Confirme ton mot de passe"
            value={signupForm.passwordConfirmation}
            onChange={(value: string) => updateSignup('passwordConfirmation', value)}
            type="password"
            autocomplete="new-password"
          />
          <Radio
            label="Le 1 décembre 2023, tu seras :"
            options={[
              { value: 'child', name: 'Mineur' },
              { value: 'adult', name: 'Majeur' },
            ]}
            name="age"
            value={signupForm.age}
            onChange={(value: string) => {
              updateSignup('age', value);
            }}
            row={true}></Radio>
          <Button primary className={styles.signupModalButton} type="submit">
            S'inscrire
          </Button>

          <div className={styles.footerText}>
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
            onClick={() => dispatch(resetPassword(forgotEmail, resetFields) as unknown as Action)}
            className={styles.forgotModalButton}
            type="submit">
            Envoyer
          </Button>

          <div className={styles.footerText}>
            <a onClick={() => setPanel('login')}>Se connecter</a>
          </div>
        </>
      ),
      action: () => {},
    },
  };

  return (
    <Modal
      title={body[panel as keyof typeof body].title}
      visible={visible}
      buttons={null}
      onCancel={() => {
        dispatch(setLoginModalVisible(false) as unknown as Action);
      }}
      className={styles.loginModal}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          body[panel as keyof typeof body].action();
        }}>
        {body[panel as keyof typeof body].content}
      </form>
    </Modal>
  );
}

export default LoginModal;
