import { API } from '../utils/api';

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

export const fetchAllCarts = () => async (dispatch) => {
  const res = await API.get('users/current/carts');
  dispatch({
    type: SET_ALLCARTS,
    allCarts: res.data,
  });
};
