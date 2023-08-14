import { User, UserEdit, UserType } from '@/types';
import { type Action, type Dispatch, createSlice } from '@reduxjs/toolkit';
import { API, setAuthorizationToken } from '@/utils/api';
import { setLoginModalVisible } from './loginModal';
import { toast } from 'react-toastify';
import { hasOrgaPermission } from '@/utils/permission';
import { RootState } from '@/lib/store';
import { setTeam } from './team';

interface LoginAction {
  token: string | null;
  user: User | null;
  loading: boolean;
}

const initialState: LoginAction = {
  token: null,
  user: null,
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
      state.user = action.payload as User;
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

export const tryLogin = (user: { login: string; password: string }) => async (dispatch: Dispatch) => {
  const res = await API.post('auth/login', user);
  dispatch(saveToken(res.token) as unknown as Action);
  localStorage.setItem('utt-arena-userid', res.user.id);
  dispatch(setUser(res.user as unknown as User) as unknown as Action);
  dispatch(setLoginModalVisible(false) as unknown as Action);
  if (res.captivePortalSuccess) {
    toast.success("Tu es maintenant connecté au réseau de l'UTT Arena");
  }
  if (hasOrgaPermission(res.user.permissions)) {
    //(window as Window).location = '/admin';
  } else {
    //(window as Window).location = '/dashboard';
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
  (window as Window).location = '/';
};

export const editUser = (data: UserEdit) => async (dispatch: Dispatch) => {
  const res = await API.patch(`/users/current`, data);
  toast.success('Tes informations ont été modifiées');
  dispatch(updateUser(res) as unknown as Action);
};

export const resetPassword = (email: string, resetFields: () => unknown) => async (dispatch: Dispatch) => {
  await API.post(`/auth/reset-password`, { email });
  toast.success("Un email de confirmation vient d'être envoyé");
  dispatch(setLoginModalVisible(false) as unknown as Action);
  resetFields();
};

export const setType = (type: UserType | undefined) => async (dispatch: Dispatch) => {
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
  (window as Window).location = '/admin';
};

export const connectAs = (id: string) => async (dispatch: Dispatch, state: RootState) => {
  localStorage.setItem('utt-arena-admin-token', (state.login as LoginAction).token!);
  const res = await API.post(`admin/auth/login/${id}`);
  localStorage.setItem('utt-arena-userid', res.user.id);
  dispatch(saveToken(res.token) as unknown as Action);
  dispatch(setUser(res.user) as unknown as Action);
  (window as Window).location = '/dashboard';
};

export default loginSlice.reducer;
