import { toast } from 'react-toastify';

import { API } from '../utils';
import errorToString from '../utils/errorToString';


export const SET_TOURNAMENT_TEAM = 'tournament/SET_TOURNAMENT_TEAM';

const initialState = {
  tournaments: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TOURNAMENT_TEAM:
      return {
        ...state,
        tournaments: {
          ...state.tournaments,
          [action.payload.id]: action.payload.teams,
        },
      };
    default:
      return state;
  }
};

export const fetchTournamentTeam = (id) => async (dispatch) => {
  try {
    const res = await API().get(`tournaments/${id}/teams?notFull=true`);
    dispatch({
      type: SET_TOURNAMENT_TEAM,
      payload: { teams: res.data, id },
    });
  }
  catch (err) {
    toast.error(errorToString(err.response.data.error));
  }
};
