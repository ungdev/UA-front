import { toast } from 'react-toastify';

import { RegisterUser } from '@/types';
import { API } from '@/utils/api';
import { type Action, createSlice, type Dispatch } from '@reduxjs/toolkit';

import { setLoginModalVisible } from '@/modules/loginModal';
import { setRedirect } from '@/modules/redirect';
import { autoLogin } from './login';

const initialState = {};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
});

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
  if (user.age === 'child' && user.legalRepresentativeAccepted === 'false') {
    toast.error("Tu dois avoir plus de 16 ans ou l'autorisation de ton responsable légal pour effectuer l'inscription");
    return;
  }

  delete user.passwordConfirmation;
  delete user.legalRepresentativeAccepted;
  await API.post('auth/register', user);
  toast.success('Inscription réussie, vérifie tes emails');
  dispatch(setLoginModalVisible(false) as unknown as Action);
  return true;
};

export const validate = (slug: string) => async (dispatch: Dispatch) => {
  try {
    const res = await API.post('auth/validate/' + slug, undefined);
    localStorage.setItem('utt-arena-userid', res.user.id);
    localStorage.setItem('utt-arena-token', res.token);

    dispatch(autoLogin() as unknown as Action);

    dispatch(setRedirect('/dashboard'));
  } catch (err) {
    dispatch(setRedirect('/'));
  }
};

export default registerSlice.reducer;
