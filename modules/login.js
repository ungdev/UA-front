import { toast } from 'react-toastify';
import Router from 'next/router';

import { setLoginModalVisible } from './loginModal';
import { API, setTokenAPI } from '../utils';
import errorToString from '../utils/errorToString';

export const SET_TOKEN = 'login/SET_TOKEN';
export const SET_USER = 'login/SET_USER';
export const SET_LOADING = 'login/SET_LOADING';

const initialState = {
  token: null,
  user: null,
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export const autoLogin = () => async (dispatch) => {
  if (localStorage.hasOwnProperty('utt-arena-token') && localStorage.hasOwnProperty('utt-arena-userid')) { // eslint-disable-line no-prototype-builtins
    const localToken = localStorage.getItem('utt-arena-token');
    const userId = localStorage.getItem('utt-arena-userid');
    try {
      dispatch(saveToken(localToken));
      const res = await API().get(`users/${userId}`);
      dispatch({
        type: SET_USER,
        user: res.data,
      });
    }
    catch (err) {
      dispatch({
        type: SET_LOADING,
        loading: false,
      });
    }
  }
  dispatch({
    type: SET_LOADING,
    loading: false,
  });
};

export const tryLogin = (user) => async (dispatch) => {
  try {
    const res = await API().post('auth/login', user);
    dispatch(saveToken(res.data.token));
    localStorage.setItem('utt-arena-userid', res.data.user.id);
    dispatch({
      type: SET_USER,
      user: res.data.user,
    });
    dispatch(setLoginModalVisible(false));
    Router.push('/dashboard');
    return true;
  }
  catch (err) {
    toast.error(errorToString(err.response.data.error));
  }
};

export const saveToken = (token) => (dispatch) => {
  dispatch({
    type: SET_TOKEN,
    token,
  });
  setTokenAPI(token);
  localStorage.setItem('utt-arena-token', token);
};

export const logout = async (dispatch) => {
  toast('Vous avez été déconnecté');
  dispatch({ type: SET_TOKEN, token: null });
  dispatch({ type: SET_USER, user: null });
  setTokenAPI('');
  localStorage.removeItem('utt-arena-userid');
  localStorage.removeItem('utt-arena-token');
  Router.push('/');
};

export const editUser = (data, email, userId) => async (dispatch) => {
  try {
    const res = await API().put(`/users/${userId}`, data);
    toast.success('Vos informations ont été modifiées');
    dispatch({
      type: SET_USER,
      user: { ...res.data, email },
    });
  }
  catch (err) {
    toast.error(errorToString(err.response.data.error));
  }
};


export const resetPassword = (email, resetFields) => async (dispatch) => {
  try {
    await API().post('auth/reset', { email });
    toast.success('Un email de confirmation vient d\'être envoyé');
    dispatch(setLoginModalVisible(false));
    resetFields();
  }
  catch (err) {
    toast.error(errorToString(err.response.data));
  }
};