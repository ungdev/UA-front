import { toast } from 'react-toastify';

import { API } from '../utils';
import errorToString from '../utils/errorToString';


export const SET_TOURNAMENTS = 'tournament/SET_TOURNAMENTS';

const initialState = {
  tournaments: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TOURNAMENTS:
      return {
        tournaments: action.payload,
      };
    default:
      return state;
  }
};

export const fetchTournaments = () => async (dispatch) => {
  try {
    const res = await API().get('/tournaments?notFull=true');
    dispatch({
      type: SET_TOURNAMENTS,
      payload: res.data,
    });
  }
  catch (err) {
    toast.error(errorToString(err.response.data.error));
  }
};
