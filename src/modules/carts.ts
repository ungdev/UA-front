import { CartWithCartItems } from '@/types';
import { API } from '@/utils/api';
import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '@/lib/store';

interface CartsAction {
  allCarts: CartWithCartItems[];
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

export const fetchAllCarts = (): AppThunk => async (dispatch) => {
  const res = await API.get('users/current/carts');
  dispatch(setAllCarts(res));
};

export default cartsSlice.reducer;
