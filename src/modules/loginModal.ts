import { createSlice, type Dispatch } from '@reduxjs/toolkit';

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

export const setLoginModalVisible = (visible: boolean) => (dispatch: Dispatch) => {
  dispatch(setVisible(visible));
};

export default loginModalSlice.reducer;
