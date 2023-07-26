import { toast } from 'react-toastify';
import Router from 'next/navigation';
import { Action, Dispatch } from '@reduxjs/toolkit';

import { setLoginModalVisible } from './loginModal';
import { API, setAuthorizationToken } from '@/utils/api';
import { hasOrgaPermission } from '@/utils/permission';
import { SET_TEAM } from './team';
import { User, UserType } from '@/types';
import { RootState } from '@/lib/store';

export const SET_TOKEN = 'login/SET_TOKEN';
export const SET_USER = 'login/SET_USER';
export const UPDATE_USER = 'login/UPDATE_USER';
export const SET_LOADING = 'login/SET_LOADING';

const initialState = {
  token: null,
  user: {} as User,
  loading: true,
};

interface LoginAction extends Action {
  token: string;
  user: User;
  loading: boolean;
}

const login = (state = initialState, action: LoginAction) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
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

export const autoLogin = () => async (dispatch: Dispatch) => {
  // eslint-disable-next-line no-prototype-builtins
  if (localStorage.hasOwnProperty('utt-arena-token') && localStorage.hasOwnProperty('utt-arena-userid')) {
    const localToken = localStorage.getItem('utt-arena-token')!;
    dispatch(saveToken(localToken) as unknown as Action);
    try {
      const res = await API.get(`users/current`);
      dispatch({
        type: SET_USER,
        user: res,
      });
    } catch (err) {
      dispatch({
        type: SET_LOADING,
        loading: false,
      });

      // Delete not working values
      localStorage.removeItem('utt-arena-token');
      localStorage.removeItem('utt-arena-userid');
      localStorage.removeItem('utt-arena-admin-token');
    }
  }
  dispatch({
    type: SET_LOADING,
    loading: false,
  });
};

export const tryLogin = (user: User) => async (dispatch: Dispatch) => {
  const res = await API.post('auth/login', user);
  dispatch(saveToken(res.token) as unknown as Action);
  localStorage.setItem('utt-arena-userid', res.user.id);
  dispatch({
    type: SET_USER,
    user: res.user,
  });
  dispatch(setLoginModalVisible(false) as unknown as Action);
  if (hasOrgaPermission(res.user.permissions)) {
    Router.redirect('/admin');
  } else {
    Router.redirect('/dashboard');
  }
  if (res.captivePortalSuccess) {
    toast.success("Tu es maintenant connecté au réseau de l'UTT Arena");
  }
  return true;
};

export const saveToken = (token: string) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_TOKEN,
    token,
  });
  setAuthorizationToken(token);
  localStorage.setItem('utt-arena-token', token);
};

export const logout = async (dispatch: Dispatch) => {
  toast('Tu as été déconnecté');
  dispatch({ type: SET_TOKEN, token: null });
  dispatch({ type: SET_USER, user: null });
  dispatch({ type: SET_TEAM, team: null });
  setAuthorizationToken('');
  localStorage.removeItem('utt-arena-userid');
  localStorage.removeItem('utt-arena-token');
  localStorage.removeItem('utt-arena-admin-token');
  Router.redirect('/');
};

export const editUser = (data: any) => async (dispatch: Dispatch) => {
  const res = await API.patch(`/users/current`, data);
  toast.success('Tes informations ont été modifiées');
  dispatch({
    type: UPDATE_USER,
    user: res,
  });
};

export const resetPassword = (email: string, resetFields: any) => async (dispatch: Dispatch) => {
  await API.post('auth/reset-password/ask', { email });
  toast.success("Un email de confirmation vient d'être envoyé");
  dispatch(setLoginModalVisible(false) as unknown as Action);
  resetFields();
};

export const setType = (type: UserType) => async (dispatch: Dispatch) => {
  let res = undefined;
  if (type === UserType.spectator) {
    res = await API.post(`/users/current/spectate`);
  } else {
    res = await API.delete(`/users/current/spectate`);
  }
  dispatch({
    type: SET_USER,
    user: res,
  });
};

export const validate = (registerToken: string) => async (dispatch: Dispatch) => {
  const res = await API.post(`auth/validate/${registerToken}`);
  toast.success('Le compte a été confirmé !');
  dispatch(saveToken(res.token) as unknown as Action);
  localStorage.setItem('utt-arena-userid', res.user.id);
  dispatch({
    type: SET_USER,
    user: res.user,
  });
};

export const isFakeConnection = () => {
  // eslint-disable-next-line no-prototype-builtins
  return localStorage.hasOwnProperty('utt-arena-admin-token');
};

export const logBackToAdmin = () => async (dispatch: Dispatch) => {
  dispatch({ type: SET_TEAM, team: null });
  dispatch(saveToken(localStorage.getItem('utt-arena-admin-token')!) as unknown as Action);
  localStorage.removeItem('utt-arena-admin-token');
  const res = await API.get('users/current');
  localStorage.setItem('utt-arena-userid', res.id);
  dispatch({
    type: SET_USER,
    user: res,
  });
  Router.redirect('/admin');
};

export const connectAs = (id: string) => async (dispatch: Dispatch, state: RootState) => {
  localStorage.setItem('utt-arena-admin-token', (state.login as any).token);
  const res = await API.post(`admin/auth/login/${id}`);
  localStorage.setItem('utt-arena-userid', res.user.id);
  dispatch(saveToken(res.token) as unknown as Action);
  dispatch({
    type: SET_USER,
    user: res.user,
  });
  Router.redirect('/dashboard');
};

export default login;
