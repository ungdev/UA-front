import { API } from '../utils/api';

export const SET_TOURNAMENTS = 'tournament/SET_TOURNAMENTS';
export const SET_SLOTS = 'tournament/SET_SLOTS';

const initialState = {
  tournaments: null,
  slots: null,
};

const tournament = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOURNAMENTS:
      return {
        ...state,
        tournaments: action.tournaments,
      };
    case SET_SLOTS:
      return {
        ...state,
        slots: action.slots,
      };
    default:
      return state;
  }
};

export const fetchTournaments = () => async (dispatch) => {
  const res = await API.get('/tournaments');
  dispatch({
    type: SET_TOURNAMENTS,
    tournaments: res.data,
  });
};

export const fetchSlots = () => async (dispatch) => {
  const res = await API.get('/tournaments?paidOnly=true');
  const slots = res.data.reduce((previous, { maxPlayers, playersPerTeam, lockedTeamsCount, id }) => {
    const total = maxPlayers / playersPerTeam;
    const available = total - lockedTeamsCount;
    previous[id] = { total, available };
    return previous;
  }, {});
  dispatch({
    type: SET_SLOTS,
    slots,
  });
};

export default tournament;
