import { toast } from 'react-toastify';

import { RegisterUser } from '@/types';
import { API } from '@/utils/api';
import { createSlice } from '@reduxjs/toolkit';
import { setRedirect } from '@/modules/redirect';
import { autoLogin } from './login';
import { AppThunk } from '@/lib/store';

const initialState = {};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
});

export const registerUser = async (user: RegisterUser) => {
  if (user.password !== user.passwordConfirmation) {
    toast.error('Les deux mots de passe ne correspondent pas');
    return false;
  }
  if (user.username.includes('.')) {
    toast.error('Le pseudo ne doit pas contenir de point.');
    return false;
  }
  if (user.age == '') {
    toast.error('Tu dois avoir plus de 16 ans le jour de l\'UTT Arena');
    return false;
  }

  await API.post('auth/register', { ...user, passwordConfirmation: undefined, legalRepresentativeAccepted: undefined });
  toast.success('Inscription réussie, vérifie tes emails');
  return true;
};

export const validate =
  (slug: string): AppThunk =>
  async (dispatch) => {
    try {
      const res = await API.post('auth/validate/' + slug, undefined);
      localStorage.setItem('utt-arena-userid', res.user.id);
      localStorage.setItem('utt-arena-token', res.token);

      dispatch(autoLogin());

      dispatch(setRedirect('/dashboard'));
    } catch {
      dispatch(setRedirect('/'));
    }
  };

export const resendEmail = (user: RegisterUser) => async () => {
  await API.post('auth/resendEmail', { username: user.username, email: user.email, password: user.password });
  toast.success('Un nouvel email a été envoyé');
  return true;
};

export default registerSlice.reducer;
