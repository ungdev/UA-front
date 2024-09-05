import { Settings } from '@/types';
import { API } from '@/utils/api';
import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '@/lib/store';

const initialState: Settings = {
  login: false,
  shop: false,
  trombi: false,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setSettings } = settingsSlice.actions;

export const fetchSettings = (): AppThunk => async (dispatch) => {
  try {
    const res = await API.get(`settings`);
    dispatch(setSettings(res));
  } catch {
    dispatch(
      setSettings({
        login: false,
        shop: false,
        trombi: false,
      }),
    );
  }
};

export const updateSetting =
  (setting: string, value: boolean): AppThunk =>
  async (dispatch) => {
    try {
      await API.patch(`admin/settings/${setting}`, { value: value.toString() });
      dispatch(setSettings({ [setting]: value }));
    } catch (err) {
      console.error(err);
    }
  };

export default settingsSlice.reducer;
