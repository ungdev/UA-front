import { createSlice } from '@reduxjs/toolkit';

const initialState = null as string | null;

export const redirectSlice = createSlice({
  name: 'redirect',
  initialState,
  reducers: {
    setRedirect: (state, action) => {
      return action.payload;
    },
  },
});

export const { setRedirect } = redirectSlice.actions;

export default redirectSlice.reducer;
