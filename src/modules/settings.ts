import { Settings } from '@/types';
import { API } from '@/utils/api';
import { createSlice, type Dispatch } from '@reduxjs/toolkit';

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

export const fetchSettings = () => async (dispatch: Dispatch) => {
  try {
    const res = await API.get(`settings`);
    dispatch(setSettings(res));
  } catch (err) {
    dispatch(
      setSettings({
        login: false,
        shop: false,
        trombi: false,
      }),
    );
  }
};

export const updateSetting = (setting: string, value: boolean) => async (dispatch: Dispatch) => {
  try {
    await API.patch(`admin/settings/${setting}`, { value: value.toString() });
    dispatch(setSettings({ [setting]: value }));
  } catch (err) {
    console.error(err);
  }
};

export default settingsSlice.reducer;
