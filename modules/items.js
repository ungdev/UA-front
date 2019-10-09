import { toast } from 'react-toastify';
import { API } from '../utils';
import errorToString from '../utils/errorToString';

export const SET_ITEMS = 'items/SET_ITEMS';

const initialState = {
  items: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};

export const fetchItems = () => async (dispatch) => {
  try {
    const res = await API().get('items');
    dispatch({
      type: SET_ITEMS,
      payload: res.data,
    });
  }
  catch (err) {
    toast.error(errorToString(err.response.data.error));
  }
};
