import { User, UserEdit, UserType } from '@/types';
import { type Action, type Dispatch, createSlice } from '@reduxjs/toolkit';
import { API } from '@/utils/api';
import { setLoginModalVisible } from '@/modules/loginModal';
import { toast } from 'react-toastify';
import { hasOrgaPermission } from '@/utils/permission';
import { RootState } from '@/lib/store';
import { setTeam } from '@/modules/team';
import { setRedirect } from '@/modules/redirect';

interface LoginAction {
  token: string | null;
  user: User | null;
  loading: boolean;
  status: {
    login: boolean;
    paid: boolean;
    team: boolean;
    admin: boolean;
    spectator: boolean;
  };
}

const initialState: LoginAction = {
  token: null,
  user: null,
  loading: true,
  status: {
    login: false,
    paid: false,
    team: false,
    admin: false,
    spectator: false,
  },
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
    setStatus: (state, action) => {
      state.status = { ...state.status, ...action.payload };
    },
  },
});

export const { setToken, setUser, updateUser, setLoading, setStatus } = loginSlice.actions;

export const autoLogin = () => async (dispatch: Dispatch) => {
  // eslint-disable-next-line no-prototype-builtins
  if (localStorage.hasOwnProperty('utt-arena-token') && localStorage.hasOwnProperty('utt-arena-userid')) {
    const localToken = localStorage.getItem('utt-arena-token')!;
    dispatch(setToken(localToken) as unknown as Action);
    try {
      const res = await API.get(`users/current`);
      dispatch(setUser(res) as unknown as Action);
      dispatch(updateStatus() as unknown as Action);
    } catch (err) {
      dispatch(setLoading(false) as unknown as Action);
      dispatch(setUser(null) as unknown as Action);
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
  localStorage.setItem('utt-arena-token', token);
};

export const tryLogin =
  (user: { login: string; password: string }, admin = false) =>
  async (dispatch: Dispatch) => {
    const res = await API.post(admin ? 'admin/auth/login' : 'auth/login', user);
    dispatch(saveToken(res.token) as unknown as Action);
    localStorage.setItem('utt-arena-userid', res.user.id);
    dispatch(setUser(res.user as unknown as User) as unknown as Action);
    dispatch(updateStatus() as unknown as Action);
    dispatch(setLoginModalVisible(false) as unknown as Action);
    if (res.captivePortalSuccess) {
      toast.success("Tu es maintenant connecté au réseau de l'UTT Arena");
    }
    if (hasOrgaPermission(res.user.permissions)) {
      dispatch(setRedirect('/admin'));
    } else {
      dispatch(setRedirect('/dashboard'));
    }
    return true;
  };

export const logout = () => (dispatch: Dispatch) => {
  dispatch(setRedirect('/'));
  dispatch(setToken(null) as unknown as Action);
  dispatch(setUser(null) as unknown as Action);
  dispatch(updateStatus() as unknown as Action);
  dispatch(setTeam(null) as unknown as Action);
  localStorage.removeItem('utt-arena-userid');
  localStorage.removeItem('utt-arena-token');
  localStorage.removeItem('utt-arena-admin-token');
  toast.success('Tu as été déconnecté');
};

export const editUser = (data: UserEdit) => async (dispatch: Dispatch) => {
  const res = await API.patch(`users/current`, data);
  toast.success('Tes informations ont été modifiées');
  dispatch(updateUser(res) as unknown as Action);
  dispatch(updateStatus() as unknown as Action);
};

export const resetPassword = (email: string, resetFields: () => unknown) => async (dispatch: Dispatch) => {
  await API.post(`auth/reset-password`, { email });
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
  dispatch(updateStatus() as unknown as Action);
};

export const validate = (registerToken: string) => async (dispatch: Dispatch) => {
  const res = await API.post(`auth/validate/${registerToken}`);
  toast.success('Le compte a été confirmé !');
  dispatch(saveToken(res.token) as unknown as Action);
  localStorage.setItem('utt-arena-userid', res.user.id);
  dispatch(setUser(res.user) as unknown as Action);
  dispatch(updateStatus() as unknown as Action);
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
  dispatch(updateStatus() as unknown as Action);
  dispatch(setRedirect('/admin'));
};

export const connectAs = (id: string) => async (dispatch: Dispatch, getState: () => RootState) => {
  const state = getState();
  localStorage.setItem('utt-arena-admin-token', (state.login as LoginAction).token!);
  const res = await API.post(`admin/auth/login/${id}`);
  localStorage.setItem('utt-arena-userid', res.user.id);
  dispatch(saveToken(res.token) as unknown as Action);
  dispatch(setUser(res.user) as unknown as Action);
  dispatch(updateStatus() as unknown as Action);
  dispatch(setRedirect('/dashboard'));
};

export const updateStatus = () => (dispatch: Dispatch, getState: () => RootState) => {
  const state = getState();
  const user = state.login.user;

  if (!user) {
    dispatch(
      setStatus({
        login: false,
        paid: false,
        team: false,
        admin: false,
        spectator: false,
      }) as unknown as Action,
    );
    return;
  }

  if (user && state.login.status.login !== !!user) {
    dispatch(
      setStatus({
        login: true,
        team: !!user.teamId,
        spectator: user.type === UserType.spectator,
      }) as unknown as Action,
    );
  } else if (user && state.login.status.team !== !!user.teamId) {
    dispatch(
      setStatus({
        team: !!user.teamId,
      }) as unknown as Action,
    );
  } else if (user && state.login.status.spectator !== (user.type === UserType.spectator)) {
    dispatch(
      setStatus({
        spectator: user.type === UserType.spectator,
      }) as unknown as Action,
    );
  }

  if (user && state.login.status.paid !== user.hasPaid) {
    dispatch(
      setStatus({
        paid: user.hasPaid,
      }) as unknown as Action,
    );
  }

  if (user && state.login.status.admin !== hasOrgaPermission(user.permissions)) {
    dispatch(
      setStatus({
        admin: hasOrgaPermission(user.permissions),
      }) as unknown as Action,
    );
  }
};

export default loginSlice.reducer;
