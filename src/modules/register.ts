import { toast } from 'react-toastify';

import { RegisterUser } from '@/types';
import { API } from '@/utils/api';
import { createSlice, type Dispatch } from '@reduxjs/toolkit';

import { setRedirect } from '@/modules/redirect';
import { Dispatch as ReactDispatch, SetStateAction } from 'react';

const initialState = {};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
});

export const registerUser = (user: RegisterUser, setPanel: ReactDispatch<SetStateAction<string>>) => async () => {
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
  setPanel('emailSent');
  return true;
};

export const validate = (slug: string) => async (dispatch: Dispatch) => {
  try {
    const res = await API.post('auth/validate/' + slug, undefined);
    localStorage.setItem('utt-arena-userid', res.user.id);
    localStorage.setItem('utt-arena-token', res.token);

    dispatch(setRedirect('/dashboard'));
  } catch (err) {
    dispatch(setRedirect('/'));
  }
};

export const resendEmail = (user: RegisterUser) => async () => {
  await API.post('auth/resendEmail', { username: user.username, email: user.email, password: user.password });
  toast.success('Un nouvel email a été envoyé');
  return true;
};

export default registerSlice.reducer;
