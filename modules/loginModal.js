export const SET_LOGINMODALVISIBLE = 'loginModal/SET_LOGINMODALVISIBLE';

const initialState = {
  visibleLoginModal: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGINMODALVISIBLE:
      return {
        visibleLoginModal: action.payload,
      };
    default:
      return state;
  }
};

export const setVisible = (visible) => (dispatch) => {
  dispatch({
    type: SET_LOGINMODALVISIBLE,
    payload: visible,
  });
};