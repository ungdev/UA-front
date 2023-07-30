import { Cart } from '@/types';
import { API } from '@/utils/api';
import { type Dispatch, createSlice } from '@reduxjs/toolkit';

interface CartsAction {
  allCarts: Cart[];
}

const initialState: CartsAction = {
  allCarts: [],
};

export const cartsSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    setAllCarts: (state, action) => {
      state.allCarts = action.payload;
    },
  },
});

export const { setAllCarts } = cartsSlice.actions;

export const fetchAllCarts = () => async (dispatch: Dispatch) => {
  const res = await API.get('users/current/carts');
  dispatch(setAllCarts(res));
};

export default cartsSlice.reducer;
