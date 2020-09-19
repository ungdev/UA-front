import { toast } from 'react-toastify';
import Router from 'next/router';

import { setLoginModalVisible } from './loginModal';
import { API } from '../utils/api';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const registerUser = (user) => async (dispatch) => {
  if (user.password !== user.passwordConfirmation) {
    toast.error('Les deux mots de passe ne correspondent pas');
    return;
  }

  await API.post('auth/register', user);
  toast.success('Inscription réussie, veuillez vérifier vos emails');
  dispatch(setLoginModalVisible(false));
  return true;
};

export const validate = (slug) => async () => {
  try {
    const res = await API.post('auth/validation', { slug });
    localStorage.setItem('utt-arena-userid', res.data.user.id);
    localStorage.setItem('utt-arena-token', res.data.token);

    // Refresh page to autoLogin
    window.location = '/dashboard';
  } catch (err) {
    Router.replace('/');
  }
};
