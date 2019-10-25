import { API } from '../utils';

const SET_VISIBLE = 'userEntry/SET_VISIBLE';
const SET_SEARCH_USER = 'userEntry/SET_SEARCH_USER';
const SET_BARCODE_USER = 'userEntry/SET_BARCODE_USER';

const initialState = {
  visible: false,
  searchUser: null,
  barcodeUser: null,
};

export default (state = initialState, payload) => {
  switch (payload.type) {
    case SET_VISIBLE:
      return {
        ...state,
        visible: payload.visible,
      };
    case SET_SEARCH_USER:
      return {
        ...state,
        searchUser: payload.user,
      };
    case SET_BARCODE_USER:
      return {
        ...state,
        barcodeUser: payload.barcodeUser,
      };
    default:
      return state;
  }
};

export const setUserModalVisible = (visible) => (dispatch) => {
  dispatch({
    type: SET_VISIBLE,
    visible,
  });
};

export const searchUser = (name) => async (dispatch) => {
  const res = await API.get(`users?email=${name}`);
  dispatch({
    type: SET_SEARCH_USER,
    searchUser: res.data,
  });
  dispatch({
    type: SET_VISIBLE,
    visible: true,
  });
};

export const searchBarcode = (barcode) => async (dispatch) => {
  const res = await API.get(`users?barcode=${barcode}`);
  dispatch({
    type: SET_BARCODE_USER,
    barcodeUser: res.data,
  });
};