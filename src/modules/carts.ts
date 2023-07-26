import { Cart } from '@/types';
import { API } from '@/utils/api';
import { Action, Dispatch } from '@reduxjs/toolkit';

export const SET_ALLCARTS = 'carts/SET_ALLCARTS';

const initialState = {
  allCarts: [],
};

interface CartsAction extends Action {
  allCarts: Cart[];
}

const carts = (state = initialState, action: CartsAction) => {
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

export const fetchAllCarts = () => async (dispatch: Dispatch) => {
  const res = await API.get('users/current/carts');
  dispatch({
    type: SET_ALLCARTS,
    allCarts: res,
  });
};

export default carts;
