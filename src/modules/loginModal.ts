import { Dispatch } from '@reduxjs/toolkit';

const SET_VISIBLE = 'loginModal/SET_VISIBLE';

const initialState = {
  visible: false,
};

const loginModal = (state = initialState, { type, visible }: { type: string; visible: boolean }) => {
  switch (type) {
    case SET_VISIBLE:
      return {
        visible,
      };
    default:
      return state;
  }
};

export const setLoginModalVisible = (visible: boolean) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_VISIBLE,
    visible,
  });
};

export default loginModal;
