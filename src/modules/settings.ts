import { Settings } from '@/types';
import { API } from '@/utils/api';
import { createSlice, type Dispatch } from '@reduxjs/toolkit';

const initialState: Settings = {
  login: false,
  shop: false,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setSettings } = settingsSlice.actions;

export const fetchSettings = () => async (dispatch: Dispatch) => {
  try {
    const res = await API.get(`settings`);
    dispatch(setSettings(res));
  } catch (err) {
    dispatch(
      setSettings({
        login: false,
        shop: false,
      }),
    );
  }
};

export default settingsSlice.reducer;
