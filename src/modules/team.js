import { toast } from 'react-toastify';
import Router from 'next/router';

import { API } from '../utils/api';
import { fetchSlots } from './tournament';

export const SET_TEAM = 'team/SET_TEAM';
export const SET_USER = 'login/SET_USER';

const initialState = null;

const team = (state = initialState, action) => {
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

export const createTeam = (bodyTeam) => async (dispatch, getState) => {
  const { user } = getState().login;
  const res = await API.post('teams', bodyTeam);
  if (bodyTeam.name.includes('solo-team')) {
    toast.success(`Tu as rejoint le tournoi.`);
  } else {
    toast.success(`L'équipe ${bodyTeam.name} a bien été créée`);
  }
  dispatch({
    type: SET_TEAM,
    team: res.data,
  });
  dispatch({
    type: SET_USER,
    user: { ...user, teamId: res.data.id, type: 'player' },
  });
  Router.push('/dashboard/team');
};

export const joinTeam = (teamId, name, userType) => async (dispatch, getState) => {
  const { user } = getState().login;
  await API.post(`/teams/${teamId}/join-requests`, { userType });
  toast.success(`Ta demande pour rejoindre ${name} a été envoyée`);
  dispatch({
    type: SET_USER,
    user: { ...user, askingTeamId: teamId },
  });
};

export const fetchCurrentTeam = () => async (dispatch) => {
  const res = await API.get(`teams/current`);
  dispatch({
    type: SET_TEAM,
    team: res.data,
  });
};

export const cancelJoin = (teamId, name) => async (dispatch, getState) => {
  const { user } = getState().login;
  await API.delete('/teams/current/join-requests/current');
  toast.success(`Ta demande pour rejoindre ${name} a été annulée`);
  dispatch({
    type: SET_USER,
    user: { ...user, askingTeamId: null },
  });
};

export const setCaptain = (id, teamId) => async (dispatch, getState) => {
  const team = getState().team;
  await API.put(`teams/current/captain/${id}`);
  dispatch({
    type: SET_TEAM,
    team: { ...team, captainId: id },
  });
};

export const acceptUser = (user, teamId) => async (dispatch, getState) => {
  const team = getState().team;
  await API.post(`teams/current/join-requests/${user.id}`);
  user.type === 'player' ? team.players.push(user) : team.coaches.push(user);

  team.askingUsers = team.askingUsers.filter(({ id }) => id !== user.id);
  dispatch({
    type: SET_TEAM,
    team,
  });
};

export const kickUser = (userId) => async (dispatch, getState) => {
  const team = getState().team;
  const user = getState().login.user;
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
    team.players = team.players.filter(({ id }) => id !== userId);
    team.coaches = team.coaches.filter(({ id }) => id !== userId);
    dispatch({
      type: SET_TEAM,
      team,
    });
  }
};

export const refuseUser = (user) => async (dispatch, getState) => {
  const team = getState().team;
  await API.delete(`teams/current/join-requests/${user.id}`);
  team.askingUsers = team.askingUsers.filter(({ id }) => id !== user.id);
  dispatch({
    type: SET_TEAM,
    team,
  });
};

export const deleteTeam = (teamId) => async (dispatch, getState) => {
  const user = getState().login.user;
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
  Router.push('/dashboard/register');
};

export const lockTeam = (teamId) => async (dispatch, getState) => {
  const res = await API.post('teams/current/lock');
  dispatch({
    type: SET_TEAM,
    team: res.data,
  });
  dispatch(fetchSlots());
  toast.success("L'équipe a bien été verrouillée");
};

export default team;
