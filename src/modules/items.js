import { API } from '../utils/api';

export const SET_ITEMS = 'items/SET_ITEMS';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEMS:
      return [...action.items];
    default:
      return state;
  }
};

export const fetchItems = () => async (dispatch) => {
  const res = await API.get('items');
  dispatch({
    type: SET_ITEMS,
    items: res.data,
  });
};
