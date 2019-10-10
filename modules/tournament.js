import { API } from '../utils';

export const SET_TOURNAMENTS = 'tournament/SET_TOURNAMENTS';

const initialState = {
  tournaments: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TOURNAMENTS:
      return {
        tournaments: action.payload,
      };
    default:
      return state;
  }
};

export const fetchTournaments = () => async (dispatch) => {
  const res = await API.get('/tournaments?notFull=true');
  dispatch({
    type: SET_TOURNAMENTS,
    payload: res.data,
  });
};
