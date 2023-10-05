import { Tournament } from '@/types';
import { API } from '@/utils/api';
import { createSlice, type Dispatch } from '@reduxjs/toolkit';

export interface TournamentAction {
  tournaments: Tournament[] | null;
  slots: {
    [key: string]: {
      total: number;
      available: number;
    };
  };
}

const initialState: TournamentAction = {
  tournaments: null,
  slots: {},
};

export const tournamentSlice = createSlice({
  name: 'tournament',
  initialState,
  reducers: {
    setTournaments: (state, action) => {
      state.tournaments = action.payload;
    },
    updateTournament: (state, action) => {
      state.tournaments = state.tournaments?.map((tournament) => {
        if (tournament.id === action.payload.id) {
          return action.payload;
        }
        return tournament;
      }) as Tournament[];
    },
    setSlots: (state, action) => {
      state.slots = action.payload;
    },
  },
});

export const { setTournaments, updateTournament, setSlots } = tournamentSlice.actions;

export const fetchTournaments = () => async (dispatch: Dispatch) => {
  const res = await API.get('tournaments');
  dispatch(setTournaments(res));
};

export const fetchSlots = () => async (dispatch: Dispatch) => {
  const res = await API.get('tournaments?paidOnly=true');
  const slots = res.reduce(
    (
      previous: {
        [key: string]: {
          total: number;
          available: number;
        };
      },
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

export default tournamentSlice.reducer;
