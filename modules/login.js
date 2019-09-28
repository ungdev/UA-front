import { toast } from 'react-toastify';
import Router from 'next/router';

import { setLoginModalVisible } from './loginModal';
import { axiosAPI } from '../utils';
import errorToString from '../utils/errorToString';


export const SET_TOKEN = 'login/SET_TOKEN';
export const SET_USER = 'login/SET_USER';

const initialState = {
  token: null,
  user: null,
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
        user: action.payload,
      };
    default:
      return state;
  }
};

export const autoLogin = () => async (dispatch) => {
  // eslint-disable-next-line no-prototype-builtins
  if (localStorage.hasOwnProperty('utt-arena-token')) {
    dispatch({
      type: SET_TOKEN,
      payload: localStorage.getItem('utt-arena-token'),
    });
    const res = await axiosAPI(localStorage.getItem('utt-arena-token')).get('user');
    dispatch({
      type: SET_USER,
      payload: res.data.user,
    });
  }
};

export const tryLogin = (user) => async (dispatch) => {
  try {
    const res = await axiosAPI().put('user/login', user);
    dispatch(saveToken(res.data.token));
    dispatch({
      type: SET_USER,
      payload: res.data.user,
    });
    dispatch(setLoginModalVisible(false));
    Router.push('/dashboard');
    return true;
  } catch (err) {
    toast.error(errorToString(err.response.data.error));
  }
};

export const saveToken = (token) => (dispatch) => {
  dispatch({
    type: SET_TOKEN,
    payload: token,
  });
  localStorage.setItem('utt-arena-token', token);
};

export const logout = async (dispatch) => {
  toast('Vous avez été déconnecté');
  await dispatch({ type: SET_TOKEN, payload: null });
  localStorage.removeItem('utt-arena-token');
  Router.push('/');
};
