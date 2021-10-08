import { toast } from 'react-toastify';
import Router from 'next/router';

import { setLoginModalVisible } from './loginModal';
import { API, setAuthorizationToken } from '../utils/api';
import { hasOrgaPermission } from '../utils/permission';
import { SET_TEAM } from './team';

export const SET_TOKEN = 'login/SET_TOKEN';
export const SET_USER = 'login/SET_USER';
export const UPDATE_USER = 'login/UPDATE_USER';
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
    case UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.user,
        },
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
  if (localStorage.hasOwnProperty('utt-arena-token') && localStorage.hasOwnProperty('utt-arena-userid')) {
    // eslint-disable-line no-prototype-builtins
    const localToken = localStorage.getItem('utt-arena-token');
    const userId = localStorage.getItem('utt-arena-userid');
    dispatch(saveToken(localToken));
    try {
      const res = await API.get(`users/current`);
      dispatch({
        type: SET_USER,
        user: res.data,
      });
    } catch (err) {
      dispatch({
        type: SET_LOADING,
        loading: false,
      });

      // Delete not working values
      localStorage.removeItem('utt-arena-token');
      localStorage.removeItem('utt-arena-userid');
    }
  }
  dispatch({
    type: SET_LOADING,
    loading: false,
  });
};

export const tryLogin = (user) => async (dispatch) => {
  const res = await API.post('auth/login', user);
  dispatch(saveToken(res.data.token));
  localStorage.setItem('utt-arena-userid', res.data.user.id);
  dispatch({
    type: SET_USER,
    user: res.data.user,
  });
  dispatch(setLoginModalVisible(false));
  if (hasOrgaPermission(res.data.user.permissions)) {
    Router.push('/admin');
  } else {
    Router.push('/dashboard');
  }
  if (res.data.captivePortalSuccess) {
    toast.success("Tu es maintenant connecté au réseau de l'UTT Arena");
  }
  return true;
};

export const saveToken = (token) => (dispatch) => {
  dispatch({
    type: SET_TOKEN,
    token,
  });
  setAuthorizationToken(token);
  localStorage.setItem('utt-arena-token', token);
};

export const logout = async (dispatch) => {
  toast('Tu as été déconnecté');
  dispatch({ type: SET_TOKEN, token: null });
  dispatch({ type: SET_USER, user: null });
  dispatch({ type: SET_TEAM, team: null });
  setAuthorizationToken('');
  localStorage.removeItem('utt-arena-userid');
  localStorage.removeItem('utt-arena-token');
  Router.push('/');
};

export const editUser = (data, userId) => async (dispatch) => {
  const res = await API.patch(`/users/current`, data);
  toast.success('Tes informations ont été modifiées');
  dispatch({
    type: UPDATE_USER,
    user: res.data,
  });
};

export const resetPassword = (email, resetFields) => async (dispatch) => {
  await API.post('auth/reset-password/ask', { email });
  toast.success("Un email de confirmation vient d'être envoyé");
  dispatch(setLoginModalVisible(false));
  resetFields();
};

export const setType = (type) => async (dispatch, getState) => {
  let res = undefined;
  if (type === 'spectator') {
    res = await API.post(`/users/current/spectate`);
  } else {
    res = await API.delete(`/users/current/spectate`);
  }
  dispatch({
    type: SET_USER,
    user: res.data,
  });
};

export const validate = (registerToken) => async (dispatch, getState) => {
  const res = await API.post(`auth/validate/${registerToken}`);
  toast.success('Le compte a été confirmé !');
  dispatch(saveToken(res.data.token));
  localStorage.setItem('utt-arena-userid', res.data.user.id);
  dispatch({
    type: SET_USER,
    user: res.data.user,
  });
};
