import { API } from '@/utils/api';
import { Action, Dispatch } from '@reduxjs/toolkit';

export const SET_TOURNAMENTS = 'tournament/SET_TOURNAMENTS';
export const SET_SLOTS = 'tournament/SET_SLOTS';

const initialState = {
  tournaments: null,
  slots: null,
};

export interface TournamentAction extends Action {
  tournaments: any;
  slots: any;
}

const tournament = (state = initialState, action: TournamentAction) => {
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

export const fetchTournaments = () => async (dispatch: Dispatch) => {
  const res = await API.get('/tournaments');
  dispatch({
    type: SET_TOURNAMENTS,
    tournaments: res,
  });
};

export const fetchSlots = () => async (dispatch: Dispatch) => {
  const res = await API.get('/tournaments?paidOnly=true');
  const slots = res.reduce(
    (
      previous: any,
      {
        maxPlayers,
        playersPerTeam,
        lockedTeamsCount,
        id,
      }: { maxPlayers: number; playersPerTeam: number; lockedTeamsCount: number; id: string },
    ) => {
      const total = maxPlayers / playersPerTeam;
      const available = total - lockedTeamsCount;
      previous[id] = { total, available };
      return previous;
    },
    {},
  );
  dispatch({
    type: SET_SLOTS,
    slots,
  });
};

export default tournament;
