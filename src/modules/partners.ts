import { createSlice } from '@reduxjs/toolkit';
import { API } from '@/utils/api';
import { Partner } from '@/types';
import { AppThunk } from '@/lib/store';

export interface PartnersAction {
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
    addPartner: (state, action) => {
      state.partners = state.partners ? [...state.partners!, action.payload] : [action.payload];
    },
    updatePartner: (state, action) => {
      state.partners = state.partners?.map((partner) => {
        if (partner.id === action.payload.id) {
          return action.payload;
        }
        return partner;
      }) as Partner[];
    },
    deletePartner: (state, action) => {
      state.partners = state.partners?.filter((partner) => partner.id !== action.payload) as Partner[];
    },
  },
});

export const { setPartners, addPartner, updatePartner, deletePartner } = partnersSlice.actions;

export const fetchPartners = (): AppThunk => async (dispatch) => {
  const request = await API.get('partners');
  dispatch(setPartners(request));
};

export default partnersSlice.reducer;
