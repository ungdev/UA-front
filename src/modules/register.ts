import { toast } from 'react-toastify';
import Router from 'next/navigation';

import { setLoginModalVisible } from './loginModal';
import { API } from '@/utils/api';
import { createSlice, type Action, type Dispatch } from '@reduxjs/toolkit';
import { RegisterUser } from '@/types';

const initialState = {};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
});

export const { } = registerSlice.actions;

export const registerUser = (user: RegisterUser) => async (dispatch: Dispatch) => {
  if (user.password !== user.passwordConfirmation) {
    toast.error('Les deux mots de passe ne correspondent pas');
    return;
  }
  if (user.username.includes('.')) {
    toast.error('Le pseudo ne doit pas contenir de point.');
    return;
  }
  if (!user.age) {
    toast.error('Tu dois cocher "Mineur" ou "Majeur" en bas du formulaire.');
    return;
  }

  delete user.passwordConfirmation;
  await API.post('auth/register', user);
  toast.success('Inscription réussie, vérifie tes emails');
  dispatch(setLoginModalVisible(false) as unknown as Action);
  return true;
};

export const validate = (slug: string) => async () => {
  try {
    const res = await API.post('auth/validation', { slug });
    localStorage.setItem('utt-arena-userid', res.user.id);
    localStorage.setItem('utt-arena-token', res.token);

    // Refresh page to autoLogin
    Router.redirect('/dashboard');
  } catch (err) {
    Router.redirect('/');
  }
};

export default registerSlice.reducer;
