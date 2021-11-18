import { toast } from 'react-toastify';

import { API } from '../utils/api';

export const SET_VISIBLE = 'userEntry/SET_VISIBLE';
export const SET_SEARCH_USER = 'userEntry/SET_SEARCH_USER';
export const SET_BARCODE_USER = 'userEntry/SET_BARCODE_USER';

const initialState = {
  visible: false,
  searchUser: null,
  barcodeUser: null,
};

const userEntry = (state = initialState, payload) => {
  switch (payload.type) {
    case SET_VISIBLE:
      return {
        ...state,
        visible: payload.visible,
      };
    case SET_SEARCH_USER:
      return {
        ...state,
        searchUser: payload.searchUser,
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
  const res = await API.get(`entry/user?search=${name}`);
  dispatch({
    type: SET_SEARCH_USER,
    searchUser: res.data,
  });
  dispatch({
    type: SET_VISIBLE,
    visible: true,
  });
};

export const scan = async (qrcode) => {
  const res = await API.post(`admin/scan`, {
    qrcode: window.btoa(String.fromCharCode.apply(null, qrcode)),
  });
  toast.success('Utilisateur scanné');
  return res;
};

export default userEntry;
