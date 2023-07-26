import { Settings } from '@/types';
import { API } from '@/utils/api';
import type { Action, Dispatch } from '@reduxjs/toolkit';

export const SET_SETTINGS = 'login/SET_SETTINGS';

const initialState = {
  login: false,
  shop: false,
};

export interface SettingsAction extends Action {
  settings: Settings;
}

const settings = (state = initialState, action: SettingsAction) => {
  switch (action.type) {
    case SET_SETTINGS:
      return action.settings;
    default:
      return state;
  }
};

export const fetchSettings = () => async (dispatch: Dispatch) => {
  try {
    const res = await API.get(`settings`);
    dispatch({
      type: SET_SETTINGS,
      settings: res,
    });
  } catch (err) {
    dispatch({
      type: SET_SETTINGS,
      settings: {
        login: false,
        shop: false,
      },
    });
  }
};

export default settings;
