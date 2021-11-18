import { API } from '../utils/api';

export const SET_SETTINGS = 'login/SET_SETTINGS';

const initialState = {
  login: false,
  shop: false,
};

const settings = (state = initialState, action) => {
  switch (action.type) {
    case SET_SETTINGS:
      return action.settings;
    default:
      return state;
  }
};

export const fetchSettings = () => async (dispatch) => {
  try {
    const res = await API.get(`settings`);
    dispatch({
      type: SET_SETTINGS,
      settings: res.data,
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
