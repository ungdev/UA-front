import { toast } from 'react-toastify';

import { API } from '@/utils/api';
import { fetchSlots } from './tournament';
import { type Action, type Dispatch, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';
import { TeamWithUsers, User, UserType } from '@/types';
import { setUser } from './login';

const initialState: TeamWithUsers | null = {} as TeamWithUsers;

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setTeam: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setTeam } = teamSlice.actions;

interface BodyTeam {
  name: string;
  tournamentId: string;
  userType: UserType;
}

export const createTeam = (bodyTeam: BodyTeam) => async (dispatch: Dispatch, state: RootState) => {
  const { user } = state.login;
  const res = await API.post('teams', bodyTeam);
  if (bodyTeam.name.includes('solo-team')) {
    toast.success(`Tu as rejoint le tournoi.`);
  } else {
    toast.success(`L'équipe ${bodyTeam.name} a bien été créée`);
  }
  dispatch(setTeam(res));
  dispatch(setUser({ ...user, teamId: res.id, type: 'player' }));
  (window as Window).location = '/dashboard/team';
};

export const joinTeam =
  (teamId: string, name: string, userType: UserType) => async (dispatch: Dispatch, state: RootState) => {
    const { user } = state.login;
    await API.post(`/teams/${teamId}/join-requests`, { userType });
    toast.success(`Ta demande pour rejoindre ${name} a été envoyée`);
    dispatch(setUser({ ...user, askingTeamId: teamId }));
  };

export const fetchCurrentTeam = () => async (dispatch: Dispatch) => {
  const res = await API.get(`teams/current`);
  dispatch(setTeam(res));
};

export const cancelJoin = (name: string) => async (dispatch: Dispatch, state: RootState) => {
  const { user } = state.login;
  await API.delete('/teams/current/join-requests/current');
  toast.success(`Ta demande pour rejoindre ${name} a été annulée`);
  dispatch(setUser({ ...user, askingTeamId: null }));
};

export const setCaptain = (id: string) => async (dispatch: Dispatch, state: RootState) => {
  const team: TeamWithUsers = state.team as TeamWithUsers;
  await API.put(`teams/current/captain/${id}`, {});
  dispatch(setTeam({ ...team, captainId: id }));
};

export const acceptUser = (user: User) => async (dispatch: Dispatch, state: RootState) => {
  const team: TeamWithUsers = state.team as TeamWithUsers;
  await API.post(`teams/current/join-requests/${user.id}`, {});
  user.type === UserType.player ? team.players.push(user) : team.coaches.push(user);

  team.askingUsers = team.askingUsers.filter(({ id }: { id: string }) => id !== user.id);
  dispatch(setTeam(team));
};

export const kickUser = (userId: string) => async (dispatch: Dispatch, state: RootState) => {
  const team: TeamWithUsers = state.team as TeamWithUsers;
  const user = state.login.user;
  if (user.id === userId) {
    await API.delete('teams/current/users/current');
    dispatch(setUser({ ...user, teamId: null, type: 'none' }));
    dispatch(setTeam(null));
  } else {
    await API.delete(`teams/current/users/${userId}`);
    team.players = team.players.filter(({ id }: { id: string }) => id !== userId);
    team.coaches = team.coaches.filter(({ id }: { id: string }) => id !== userId);
    dispatch(setTeam(team));
  }
};

export const refuseUser = (user: User) => async (dispatch: Dispatch, state: RootState) => {
  const team = state.team as TeamWithUsers;
  await API.delete(`teams/current/join-requests/${user.id}`);
  team.askingUsers = team.askingUsers.filter(({ id }: { id: string }) => id !== user.id);
  dispatch(setTeam(team));
};

export const deleteTeam = () => async (dispatch: Dispatch, state: RootState) => {
  const user = state.login.user;
  await API.delete('teams/current');
  dispatch(setUser({ ...user, teamId: null, type: 'none' }));
  dispatch(setTeam(null));
  toast.success("L'équipe a bien été supprimée");
  (window as Window).location = '/dashboard/register';
};

export const lockTeam = () => async (dispatch: Dispatch) => {
  const res = await API.post('teams/current/lock', {});
  dispatch(setTeam(res));
  dispatch(fetchSlots() as unknown as Action);
  toast.success("L'équipe a bien été verrouillée");
};

export default teamSlice.reducer;
