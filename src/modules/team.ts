import { toast } from 'react-toastify';
import Router from 'next/navigation';

import { API } from '@/utils/api';
import { fetchSlots } from './tournament';
import { Action, Dispatch } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';
import { Team, TeamWithUsers, User, UserType } from '@/types';

export const SET_TEAM = 'team/SET_TEAM';
export const SET_USER = 'login/SET_USER';

const initialState = {} as unknown as TeamWithUsers;

interface TeamAction extends Action {
  team: Team;
}

const team = (state = initialState, action: TeamAction) => {
  switch (action.type) {
    case SET_TEAM:
      return {
        ...state,
        ...action.team,
      };
    default:
      return state;
  }
};

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
  dispatch({
    type: SET_TEAM,
    team: res,
  });
  dispatch({
    type: SET_USER,
    user: { ...user, teamId: res.id, type: 'player' },
  });
  Router.redirect('/dashboard/team');
};

export const joinTeam =
  (teamId: string, name: string, userType: UserType) => async (dispatch: Dispatch, state: RootState) => {
    const { user } = state.login;
    await API.post(`/teams/${teamId}/join-requests`, { userType });
    toast.success(`Ta demande pour rejoindre ${name} a été envoyée`);
    dispatch({
      type: SET_USER,
      user: { ...user, askingTeamId: teamId },
    });
  };

export const fetchCurrentTeam = () => async (dispatch: Dispatch) => {
  const res = await API.get(`teams/current`);
  dispatch({
    type: SET_TEAM,
    team: res,
  });
};

export const cancelJoin = (name: string) => async (dispatch: Dispatch, state: RootState) => {
  const { user } = state.login;
  await API.delete('/teams/current/join-requests/current');
  toast.success(`Ta demande pour rejoindre ${name} a été annulée`);
  dispatch({
    type: SET_USER,
    user: { ...user, askingTeamId: null },
  });
};

export const setCaptain = (id: string) => async (dispatch: Dispatch, state: RootState) => {
  const team = state.team;
  await API.put(`teams/current/captain/${id}`, {});
  dispatch({
    type: SET_TEAM,
    team: { ...team, captainId: id },
  });
};

export const acceptUser = (user: User) => async (dispatch: Dispatch, state: RootState) => {
  const team = state.team;
  await API.post(`teams/current/join-requests/${user.id}`, {});
  user.type === UserType.player ? team.players.push(user) : team.coaches.push(user);

  team.askingUsers = team.askingUsers.filter(({ id }: { id: string }) => id !== user.id);
  dispatch({
    type: SET_TEAM,
    team,
  });
};

export const kickUser = (userId: string) => async (dispatch: Dispatch, state: RootState) => {
  const team = state.team;
  const user = state.login.user;
  if (user.id === userId) {
    await API.delete('teams/current/users/current');
    dispatch({
      type: SET_USER,
      user: { ...user, teamId: null, type: 'none' },
    });
    dispatch({
      type: SET_TEAM,
      team: null,
    });
  } else {
    await API.delete(`teams/current/users/${userId}`);
    team.players = team.players.filter(({ id }: { id: string }) => id !== userId);
    team.coaches = team.coaches.filter(({ id }: { id: string }) => id !== userId);
    dispatch({
      type: SET_TEAM,
      team,
    });
  }
};

export const refuseUser = (user: User) => async (dispatch: Dispatch, state: RootState) => {
  const team = state.team;
  await API.delete(`teams/current/join-requests/${user.id}`);
  team.askingUsers = team.askingUsers.filter(({ id }: { id: string }) => id !== user.id);
  dispatch({
    type: SET_TEAM,
    team,
  });
};

export const deleteTeam = () => async (dispatch: Dispatch, state: RootState) => {
  const user = state.login.user;
  await API.delete('teams/current');
  dispatch({
    type: SET_USER,
    user: { ...user, teamId: null, type: 'none' },
  });
  dispatch({
    type: SET_TEAM,
    team: null,
  });
  toast.success("L'équipe a bien été supprimée");
  Router.redirect('/dashboard/register');
};

export const lockTeam = () => async (dispatch: Dispatch) => {
  const res = await API.post('teams/current/lock', {});
  dispatch({
    type: SET_TEAM,
    team: res,
  });
  dispatch(fetchSlots() as unknown as Action);
  toast.success("L'équipe a bien été verrouillée");
};

export default team;
