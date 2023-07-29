import { createSlice, type Dispatch } from '@reduxjs/toolkit';
import { uploads } from '@/utils/api';
import { Partner } from '@/types';

export const SET_PARTNERS = 'partners/SET_PARTNERS';

interface PartnersAction {
  partners: Partner[] | null;
}

const initialState: PartnersAction = {
  partners: null,
};

export const partnersSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {
    setPartners: (state, action) => {
      state.partners = action.payload;
    },
  },
});

export const { setPartners } = partnersSlice.actions;

export const fetchPartners = async (dispatch: Dispatch) => {
  const request = await uploads.get('/partners/list.json', true);
  dispatch(setPartners(request));
};

export default partnersSlice.reducer;
