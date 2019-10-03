import { toast } from 'react-toastify';
import Router from 'next/router';

import { API } from '../utils';
import errorToString from '../utils/errorToString';


export const SET_TEAM = 'team/SET_TEAM';

const initialState = {
  team: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TEAM:
      return {
        ...state,
        team: action.payload,
      };
    default:
      return state;
  }
};

export const createTeam = (bodyTeam) => async (dispatch, getState) => {
  try {
    const { user } = getState().login;
    const res = await API().post('teams', bodyTeam);
    toast.success(`L'équipe ${bodyTeam.name} a bien été créée`);
    dispatch({
      type: SET_TEAM,
      payload: res.data,
    });
    dispatch({
      type: 'login/SET_USER',
      payload: { ...user, teamId: res.data.id },
    });
    Router.push('/dashboard');
  }
  catch (err) {
    toast.error(errorToString(err.response.data.error));
  }
};

export const joinTeam = (teamId, name) => async (dispatch, getState) => {
  try {
    const { user } = getState().login;
    await API().post(`/teams/${teamId}/request`);
    toast.success(`Votre demande pour rejoindre ${name} a bien été prise en compte`);
    dispatch({
      type: 'login/SET_USER',
      payload: { ...user, askingTeamId: teamId },
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
    toast.success(`Votre demande pour rejoindre ${name} a été annulé`);
    dispatch({
      type: 'login/SET_USER',
      payload: { ...user, askingTeamId: null },
    });
  }
  catch (err) {
    toast.error(errorToString(err.response.data.error));
  }
};