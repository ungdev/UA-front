import { toast } from 'react-toastify';
import Router from 'next/router';

import { setLoginModalVisible } from './loginModal';
import { axiosAPI } from '../utils';

import { saveToken } from './login';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const registerUser = user => async dispatch => {
  if (user.password !== user.passwordConfirmation) {
    toast.error('PASSWORD_MISMATCH');
    return;
  }
  try {
    await axiosAPI().post('user', user);
    toast.success('Inscription réussie');
    dispatch(setLoginModalVisible(false));
    return true;
  } catch (err) {
    toast.error(err.response.data.error);
  }
};

export const validate = token => async dispatch => {
  try {
    const res = await axiosAPI().post('user/validate', { token });
    await dispatch(saveToken(res.data.token));
    toast.success('Inscription validée');
    Router.push('/dashboard');
  } catch (err) {
    toast.error(err.response.data.error);
  }
};