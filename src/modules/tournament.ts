import { TournamentWithTeams } from '@/types';
import { API } from '@/utils/api';
import { createSlice, type Dispatch } from '@reduxjs/toolkit';

export interface TournamentAction {
  tournaments: TournamentWithTeams[] | null;
  slots: {
    [key: string]: {
      total: number;
      available: number;
    };
  } | null;
}

const initialState = {
  tournaments: null,
  slots: null,
};

export const tournament = createSlice({
  name: 'tournament',
  initialState,
  reducers: {
    setTournaments: (state, action) => {
      state.tournaments = action.payload;
    },
    setSlots: (state, action) => {
      state.slots = action.payload;
    },
  },
});

export const { setTournaments, setSlots } = tournament.actions;

export const fetchTournaments = () => async (dispatch: Dispatch) => {
  const res = await API.get('/tournaments');
  dispatch(setTournaments(res));
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
  dispatch(setSlots(slots));
};

export default tournament.reducer;
