import { toast } from 'react-toastify';
import Router from 'next/router';

import { API } from '../utils';
import errorToString from '../utils/errorToString';


export const SET_TEAM = 'team/SET_TEAM';
export const SET_USER = 'login/SET_USER';

const initialState = {
  team: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TEAM:
      return {
        ...state,
        team: action.team,
      };
    default:
      return state;
  }
};

export const createTeam = (bodyTeam) => async (dispatch, getState) => {
  try {
    const { user } = getState().login;
    const res = await API().post('teams', bodyTeam);
    if (bodyTeam.name.includes('solo-team')) {
      toast.success(`Vous avez rejoint le tournoi ${res.data.tournament.shortName}`);
    }
    else {
      toast.success(`L'équipe ${bodyTeam.name} a bien été créée`);
    }
    dispatch({
      type: SET_TEAM,
      team: res.data,
    });
    dispatch({
      type: SET_USER,
      user: { ...user, team: res.data.id },
    });
    Router.push('/dashboard/team');
  }
  catch (err) {
    toast.error(errorToString(err.response.data.error));
  }
};

export const joinTeam = (teamId, name) => async (dispatch, getState) => {
  try {
    const { user } = getState().login;
    await API().post(`/teams/${teamId}/request`);
    toast.success(`Votre demande pour rejoindre ${name} a été envoyée`);
    dispatch({
      type: SET_USER,
      user: { ...user, askingTeamId: teamId },
    });
  }
  catch (err) {
    toast.error(errorToString(err.response.data.error));
  }
};

export const fetchTeam = (id) => async (dispatch) => {
  try {
    const res = await API().get(`teams/${id}`);
    dispatch({
      type: SET_TEAM,
      team: res.data,
    });
  }
  catch (err) {
    toast.error(errorToString(err.response.data.error));
  }
};


export const cancelJoin = (teamId, name) => async (dispatch, getState) => {
  try {
    const { user } = getState().login;
    await API().delete(`/teams/${teamId}/request`, { data: { user: user.id } });
    toast.success(`Votre demande pour rejoindre ${name} a été annulée`);
    dispatch({
      type: SET_USER,
      user: { ...user, askingTeamId: null },
    });
  }
  catch (err) {
    toast.error(errorToString(err.response.data.error));
  }
};

export const setCaptain = (id, teamId) => async (dispatch, getState) => {
  try {
    const team = getState().team.team;
    await API().put(`teams/${teamId}`, { captainId: id });
    dispatch({
      type: SET_TEAM,
      team: { ...team, captainId: id },
    });
  }
  catch (err) {
    toast.error(errorToString(err.response.data.error));
  }
};

export const acceptUser = (user, teamId) => async (dispatch, getState) => {
  try {
    const team = getState().team.team;
    await API().post(`teams/${teamId}/users`, { user: user.id });
    team.users.push(user);
    team.askingUsers = team.askingUsers.filter(({ id }) => id !== user.id);
    dispatch({
      type: SET_TEAM,
      team,
    });
  }
  catch (err) {
    toast.error(errorToString(err.response.data.error));
  }
};

export const kickUser = (userId, teamId) => async (dispatch, getState) => {
  try {
    const team = getState().team.team;
    const user = getState().login.user;
    await API().delete(`teams/${teamId}/users/${userId}`);
    if (user.id === userId) {
      dispatch({
        type: SET_USER,
        user: { ...user, team: null },
      });
      dispatch({
        type: SET_TEAM,
        team: null,
      });
    }
    else {
      team.users = team.users.filter(({ id }) => id !== userId);
      dispatch({
        type: SET_TEAM,
        team,
      });
    }
  }
  catch (err) {
    toast.error(errorToString(err.response.data.error));
  }
};

export const refuseUser = (user, teamId) => async (dispatch, getState) => {
  try {
    const team = getState().team.team;
    await API().delete(`teams/${teamId}/request`, { data: { user: user.id } });
    team.askingUsers = team.askingUsers.filter(({ id }) => id !== user.id);
    dispatch({
      type: SET_TEAM,
      team,
    });
  }
  catch (err) {
    toast.error(errorToString(err.response.data.error));
  }
};

export const deleteTeam = (teamId) => async (dispatch, getState) => {
  try {
    const user = getState().login.user;
    await API().delete(`teams/${teamId}`);
    dispatch({
      type: SET_USER,
      user: { ...user, team: null },
    });
    dispatch({
      type: SET_TEAM,
      team: null,
    });
    Router.push('/dashboard/register');
  }
  catch (err) {
    toast.error(errorToString(err.response.data.error));
  }
};