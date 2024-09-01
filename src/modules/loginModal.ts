import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '@/lib/store';

const initialState = {
  visible: false,
};

export const loginModalSlice = createSlice({
  name: 'loginModal',
  initialState,
  reducers: {
    setVisible: (state, action) => {
      state.visible = action.payload;
    },
  },
});

export const { setVisible } = loginModalSlice.actions;

export const setLoginModalVisible =
  (visible: boolean): AppThunk =>
  (dispatch) => {
    dispatch(setVisible(visible));
  };

export default loginModalSlice.reducer;
