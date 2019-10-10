import { API } from '../utils';

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
  const res = await API.get('items');
  dispatch({
    type: SET_ITEMS,
    payload: res.data,
  });
};
