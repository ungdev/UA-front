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
    const res = await API().post('/teams', bodyTeam);
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
