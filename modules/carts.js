import { toast } from 'react-toastify';

import { API } from '../utils';
import errorToString from '../utils/errorToString';


export const SET_ALLCARTS = 'carts/SET_ALLCARTS';

const initialState = {
  allCarts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALLCARTS:
      return {
        ...state,
        allCarts: action.allCarts,
      };
    default:
      return state;
  }
};

export const fetchAllCarts = () => async (dispatch, getState) => {
  try {
    const userId = getState().login.user.id;
    const res = await API().get(`users/${userId}/carts`);
    dispatch({
      type: SET_ALLCARTS,
      allCarts: res.data,
    });
  }
  catch (err) {
    toast.error(errorToString(err.response.data.error));
  }
};
