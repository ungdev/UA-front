import { Team, User, UserType } from '@/types';
import { Action, Dispatch, createSlice } from '@reduxjs/toolkit';
import { API, setAuthorizationToken } from '@/utils/api';
import { setLoginModalVisible } from './loginModal';
import { toast } from 'react-toastify';
import { hasOrgaPermission } from '@/utils/permission';
import Router from 'next/navigation';
import { RootState } from '@/lib/store';
import { setTeam } from './team';

interface LoginAction {
  token: string | null;
  user: User;
  loading: boolean;
}

const initialState: LoginAction = {
  token: null,
  user: {} as User,
  loading: true,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setToken, setUser, updateUser, setLoading } = loginSlice.actions;

export const autoLogin = () => async (dispatch: Dispatch) => {
  // eslint-disable-next-line no-prototype-builtins
  if (localStorage.hasOwnProperty('utt-arena-token') && localStorage.hasOwnProperty('utt-arena-userid')) {
    const localToken = localStorage.getItem('utt-arena-token')!;
    dispatch(setToken(localToken) as unknown as Action);
    try {
      const res = await API.get(`users/current`);
      dispatch(setUser(res) as unknown as Action);
    } catch (err) {
      dispatch(setLoading(false) as unknown as Action);

      // Delete not working values
      localStorage.removeItem('utt-arena-token');
      localStorage.removeItem('utt-arena-userid');
      localStorage.removeItem('utt-arena-admin-token');
    }
  }
  dispatch(setLoading(false) as unknown as Action);
};

export const saveToken = (token: string) => (dispatch: Dispatch) => {
  dispatch(setToken(token) as unknown as Action);
  setAuthorizationToken(token);
  localStorage.setItem('utt-arena-token', token);
};

export const tryLogin = (user: User) => async (dispatch: Dispatch) => {
  const res = await API.post('auth/login', user);
  dispatch(saveToken(res.token) as unknown as Action);
  localStorage.setItem('utt-arena-userid', res.user.id);
  dispatch(setUser(res.user) as unknown as Action);
  dispatch(setLoginModalVisible(false) as unknown as Action);
  if (res.captivePortalSuccess) {
    toast.success("Tu es maintenant connecté au réseau de l'UTT Arena");
  }
  if (hasOrgaPermission(res.user.permissions)) {
    Router.redirect('/admin');
  } else {
    Router.redirect('/dashboard');
  }
  return true;
};

export const logout = () => (dispatch: Dispatch) => {
  toast('Tu as été déconnecté');
  dispatch(setToken(null) as unknown as Action);
  dispatch(setUser({} as User) as unknown as Action);
  dispatch(setTeam(null) as unknown as Action);
  setAuthorizationToken('');
  localStorage.removeItem('utt-arena-userid');
  localStorage.removeItem('utt-arena-token');
  localStorage.removeItem('utt-arena-admin-token');
  Router.redirect('/');
};

export const editUser = (data: User) => async (dispatch: Dispatch) => {
  const res = await API.patch(`/users/current`, data);
  toast.success('Tes informations ont été modifiées');
  dispatch(updateUser(res) as unknown as Action);
};

export const resetPassword = (email: string, resetFields: any) => async (dispatch: Dispatch) => {
  await API.post(`/auth/reset-password`, { email });
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
  dispatch(setUser(res) as unknown as Action);
};

export const validate = (registerToken: string) => async (dispatch: Dispatch) => {
  const res = await API.post(`auth/validate/${registerToken}`);
  toast.success('Le compte a été confirmé !');
  dispatch(saveToken(res.token) as unknown as Action);
  localStorage.setItem('utt-arena-userid', res.user.id);
  dispatch(setUser(res.user) as unknown as Action);
};

export const isFakeConnection = () => {
  // eslint-disable-next-line no-prototype-builtins
  return localStorage.hasOwnProperty('utt-arena-admin-token');
};

export const logBackToAdmin = () => async (dispatch: Dispatch) => {
  dispatch(setTeam(null) as unknown as Action);
  dispatch(saveToken(localStorage.getItem('utt-arena-admin-token')!) as unknown as Action);
  localStorage.removeItem('utt-arena-admin-token');
  const res = await API.get('users/current');
  localStorage.setItem('utt-arena-userid', res.id);
  dispatch(setUser(res) as unknown as Action);
  Router.redirect('/admin');
};

export const connectAs = (id: string) => async (dispatch: Dispatch, state: RootState) => {
  localStorage.setItem('utt-arena-admin-token', (state.login as any).token);
  const res = await API.post(`admin/auth/login/${id}`);
  localStorage.setItem('utt-arena-userid', res.user.id);
  dispatch(saveToken(res.token) as unknown as Action);
  dispatch(setUser(res.user) as unknown as Action);
  Router.redirect('/dashboard');
};

export default loginSlice.reducer;
