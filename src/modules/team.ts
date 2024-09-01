import { toast } from 'react-toastify';

import { API } from '@/utils/api';
import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '@/lib/store';
import { TeamWithUsers, User, UserType } from '@/types';
import { setUser, updateStatus } from '@/modules/login';
import { setRedirect } from '@/modules/redirect';

const initialState: { team: TeamWithUsers | null } = { team: null };

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setTeam: (state, action) => {
      state.team = action.payload;
    },
  },
});

export const { setTeam } = teamSlice.actions;

interface BodyTeam {
  name: string;
  tournamentId: string;
  pokemonPlayerId?: string;
  userType: UserType;
}

export const createTeam =
  (bodyTeam: BodyTeam): AppThunk =>
  async (dispatch, getState) => {
    if (bodyTeam.pokemonPlayerId !== undefined && !bodyTeam.pokemonPlayerId!.match(/^\d+$/)) {
      toast.error('ID invalide');
      return;
    }
    const state = getState();
    const { user } = state.login;
    const res = await API.post('teams', bodyTeam);
    if (bodyTeam.name.includes('solo-team')) {
      toast.success(`Tu as rejoint le tournoi.`);
    } else {
      toast.success(`L'équipe ${bodyTeam.name} a bien été créée`);
    }
    dispatch(setTeam(res));
    dispatch(setUser({ ...user, teamId: res.id, type: bodyTeam.userType }));
    dispatch(updateStatus());
    dispatch(setRedirect('/dashboard/team'));
  };

export const joinTeam =
  (teamId: string, name: string, userType: UserType): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const { user } = state.login;
    await API.post(`teams/${teamId}/join-requests`, { userType });
    toast.success(`Ta demande pour rejoindre ${name} a été envoyée`);
    dispatch(setUser({ ...user, askingTeamId: teamId }));
    dispatch(updateStatus());
  };

export const fetchCurrentTeam = (): AppThunk => async (dispatch) => {
  const res = await API.get(`teams/current`);
  dispatch(setTeam(res));
};

export const cancelJoin =
  (name: string): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const { user } = state.login;
    await API.delete('teams/current/join-requests/current');
    toast.success(`Ta demande pour rejoindre ${name} a été annulée`);
    dispatch(setUser({ ...user, askingTeamId: null }));
    dispatch(updateStatus());
  };

export const setCaptain =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const team: TeamWithUsers = state.team.team as TeamWithUsers;
    await API.put(`teams/current/captain/${id}`, {});
    dispatch(setTeam({ ...team, captainId: id }));
  };

export const acceptUser =
  (user: User): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const team: TeamWithUsers = state.team.team as TeamWithUsers;
    await API.post(`teams/current/join-requests/${user.id}`, {});
    const newTeam = { ...team };
    if (user.type === UserType.player) {
      newTeam.players = [...newTeam.players, user];
    } else {
      newTeam.coaches = [...newTeam.coaches, user];
    }

    newTeam.askingUsers = newTeam.askingUsers.filter(({ id }: { id: string }) => id !== user.id);
    dispatch(setTeam(newTeam));
  };

export const kickUser =
  (userId: string): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const team: TeamWithUsers = state.team.team as TeamWithUsers;
    const user = state.login.user!;
    if (user.id === userId) {
      await API.delete('teams/current/users/current');
      dispatch(setUser({ ...user, teamId: null, type: 'none' }));
      dispatch(updateStatus());
      dispatch(setTeam(null));
    } else {
      await API.delete(`teams/current/users/${userId}`);
      const newTeam = {
        ...team,
        players: team.players.filter(({ id }: { id: string }) => id !== userId),
        coaches: team.coaches.filter(({ id }: { id: string }) => id !== userId),
      };
      dispatch(setTeam(newTeam));
    }
  };

export const refuseUser =
  (user: User): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const team = state.team.team as TeamWithUsers;
    await API.delete(`teams/current/join-requests/${user.id}`);
    const newTeam = { ...team, askingUsers: team.askingUsers.filter(({ id }: { id: string }) => id !== user.id) };
    dispatch(setTeam(newTeam));
  };

export const deleteTeam = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const user = state.login.user;
  await API.delete('teams/current');
  dispatch(setUser({ ...user, teamId: null, type: 'none' }));
  dispatch(updateStatus());
  dispatch(setTeam(null));
  toast.success("L'équipe a bien été supprimée");
  dispatch(setRedirect('/dashboard/register'));
};

export default teamSlice.reducer;
