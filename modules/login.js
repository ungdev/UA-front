import { toast } from 'react-toastify';

import { setLoginModalVisible } from './loginModal';
import { axiosAPI } from '../utils';

import Router from 'next/router';

export const SET_TOKEN = 'login/SET_TOKEN';

const initialState = {
  token: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
};

export const autoLogin = () => {
  return async dispatch => {
    if (localStorage.hasOwnProperty('arena-2019-token')) {
      dispatch({
        type: SET_TOKEN,
        payload: localStorage.getItem('arena-2019-token')
      });
    }
  };
};

export const tryLogin = user => async dispatch => {
  try {
    const res = await axiosAPI().put('user/login', user);
    dispatch(saveToken(res.data.token));
    dispatch(setLoginModalVisible(false));
    toast.success('Connexion validée');
    Router.push('/dashboard');
  } catch (err) {
    toast.error(err.response.data.error);
  }
};

export const saveToken = token => dispatch => {
  dispatch({
    type: SET_TOKEN,
    payload: token
  });
  localStorage.setItem('arena-2019-token', token);
};

export const logout = () => {
  return async dispatch => {
    dispatch({ type: SET_TOKEN, payload: null });

    localStorage.removeItem('arena-2019-token');
  };
};