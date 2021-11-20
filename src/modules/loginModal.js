const SET_VISIBLE = 'loginModal/SET_VISIBLE';

const initialState = {
  visible: false,
};

const loginModal = (state = initialState, { type, visible }) => {
  switch (type) {
    case SET_VISIBLE:
      return {
        visible,
      };
    default:
      return state;
  }
};

export const setLoginModalVisible = (visible) => (dispatch) => {
  dispatch({
    type: SET_VISIBLE,
    visible,
  });
};

export default loginModal;
