import { Permission, User, UserEdit, UserType } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { API } from '@/utils/api';
import { setLoginModalVisible } from '@/modules/loginModal';
import { toast } from 'react-toastify';
import { AppThunk } from '@/lib/store';
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

export const autoLogin = (): AppThunk => async (dispatch) => {
  // eslint-disable-next-line no-prototype-builtins
  if (localStorage.hasOwnProperty('utt-arena-token') && localStorage.hasOwnProperty('utt-arena-userid')) {
    const localToken = localStorage.getItem('utt-arena-token')!;
    dispatch(setToken(localToken));
    try {
      const res = await API.get(`users/current`);
      dispatch(setUser(res));
      dispatch(updateStatus());
    } catch {
      dispatch(setLoading(false));
      dispatch(setUser(null));
      // Delete not working values
      localStorage.removeItem('utt-arena-token');
      localStorage.removeItem('utt-arena-userid');
      localStorage.removeItem('utt-arena-admin-token');
    }
  }
  dispatch(setLoading(false));
};

export const saveToken =
  (token: string): AppThunk =>
  (dispatch) => {
    dispatch(setToken(token));
    localStorage.setItem('utt-arena-token', token);
  };

export const tryLogin =
  (user: { login: string; password: string }, admin = false): AppThunk =>
  async (dispatch) => {
    const res = await API.post(admin ? 'admin/auth/login' : 'auth/login', user);
    dispatch(saveToken(res.token));
    localStorage.setItem('utt-arena-userid', res.user.id);
    dispatch(setUser(res.user as unknown as User));
    dispatch(updateStatus());
    dispatch(setLoginModalVisible(false));
    if (res.captivePortalSuccess) {
      toast.success("Tu es maintenant connecté au réseau de l'UTT Arena");
    }
    if (res.user.permissions.includes(Permission.orga)) {
      dispatch(setRedirect('/admin'));
    } else {
      dispatch(setRedirect('/dashboard'));
    }
    return true;
  };

export const logout = (): AppThunk => (dispatch) => {
  dispatch(setRedirect('/'));
  dispatch(setToken(null));
  dispatch(setUser(null));
  dispatch(updateStatus());
  dispatch(setTeam(null));
  localStorage.removeItem('utt-arena-userid');
  localStorage.removeItem('utt-arena-token');
  localStorage.removeItem('utt-arena-admin-token');
  toast.success('Tu as été déconnecté');
};

export const editUser =
  (data: UserEdit): AppThunk =>
  async (dispatch) => {
    const res = await API.patch(`users/current`, data);
    toast.success('Tes informations ont été modifiées');
    dispatch(updateUser(res));
    dispatch(updateStatus());
  };

export const editUserFfsu = 
  (data: { ffsuLicense: string | null }): AppThunk =>
  async (dispatch) => {
    const res = await API.patch(`users/current/ffsu`, data);
    toast.success('Ton numéro de licence FFSU a été modifié');
    dispatch(updateUser(res));
    dispatch(updateStatus());
  }

export const resetPassword =
  (email: string, resetFields: () => unknown): AppThunk =>
  async (dispatch) => {
    await API.post(`auth/reset-password/ask`, { email });
    toast.success("Un email de confirmation vient d'être envoyé");
    dispatch(setLoginModalVisible(false));
    resetFields();
  };

export const setType =
  (type: UserType | undefined): AppThunk =>
  async (dispatch) => {
    let res = undefined;
    if (type === UserType.spectator) {
      res = await API.post('users/current/spectate');
    } else {
      res = await API.delete('users/current/spectate');
    }
    dispatch(setUser(res));
    dispatch(updateStatus());
  };

export const validate =
  (registerToken: string): AppThunk =>
  async (dispatch) => {
    const res = await API.post(`auth/validate/${registerToken}`);
    toast.success('Le compte a été confirmé !');
    dispatch(saveToken(res.token));
    localStorage.setItem('utt-arena-userid', res.user.id);
    dispatch(setUser(res.user));
    dispatch(updateStatus());
  };

export const isFakeConnection = () => {
  // eslint-disable-next-line no-prototype-builtins
  return localStorage.hasOwnProperty('utt-arena-admin-token');
};

export const logBackToAdmin = (): AppThunk => async (dispatch) => {
  dispatch(setTeam(null));
  dispatch(saveToken(localStorage.getItem('utt-arena-admin-token')!));
  localStorage.removeItem('utt-arena-admin-token');
  const res = await API.get('users/current');
  localStorage.setItem('utt-arena-userid', res.id);
  dispatch(setUser(res));
  dispatch(updateStatus());
  dispatch(setRedirect('/admin'));
};

export const connectAs =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    localStorage.setItem('utt-arena-admin-token', (state.login as LoginAction).token!);
    const res = await API.post(`admin/auth/login/${id}`);
    localStorage.setItem('utt-arena-userid', res.user.id);
    dispatch(saveToken(res.token));
    dispatch(setUser(res.user));
    dispatch(updateStatus());
    dispatch(setRedirect('/dashboard'));
  };

export const updateStatus = (): AppThunk => (dispatch, getState) => {
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
      }),
    );
    return;
  }

  if (user && state.login.status.login !== !!user) {
    dispatch(
      setStatus({
        login: true,
        team: !!user.teamId,
        spectator: user.type === UserType.spectator,
      }),
    );
  } else if (user && state.login.status.team !== !!user.teamId) {
    dispatch(
      setStatus({
        team: !!user.teamId,
      }),
    );
  } else if (user && state.login.status.spectator !== (user.type === UserType.spectator)) {
    dispatch(
      setStatus({
        spectator: user.type === UserType.spectator,
      }),
    );
  }

  if (user && state.login.status.paid !== user.hasPaid) {
    dispatch(
      setStatus({
        paid: user.hasPaid,
      }),
    );
  }

  if (user && state.login.status.admin !== user.permissions.includes(Permission.orga)) {
    dispatch(
      setStatus({
        admin: user.permissions.includes(Permission.orga),
      }),
    );
  }
};

export default loginSlice.reducer;
