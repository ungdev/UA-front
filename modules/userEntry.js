import { API } from '../utils';
import { toast } from 'react-toastify';

export const SET_VISIBLE = 'userEntry/SET_VISIBLE';
export const SET_SEARCH_USER = 'userEntry/SET_SEARCH_USER';
export const SET_BARCODE_USER = 'userEntry/SET_BARCODE_USER';

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

export const searchBarcode = (barcode) => async (dispatch) => {
  const res = await API.post(`entry/scan?barcode=${barcode}`);
  toast.success(`${res.data.username} scanné`);
  dispatch({
    type: SET_BARCODE_USER,
    barcodeUser: res.data,
  });
};

export const searchManually = (username) => async (dispatch) => {
  const res = await API.post(`entry/scan?search=${username}`);
  toast.success(`${res.data.username} scanné`);
  dispatch({
    type: SET_BARCODE_USER,
    barcodeUser: res.data,
  });
};

export const validatePay = (id) => async (dispatch) => {
  await API.post(`entry/forcePay/${id}`);
  toast.success('Paiement validé');
  dispatch({
    type: SET_VISIBLE,
    visible: false,
  });
};

export const saveUser = (id, body, username) => async (dispatch) => {
  await API.put(`admin/users/${id}`, body);
  toast.success(`${username} mis à jour`);
  dispatch({
    type: SET_VISIBLE,
    visible: false,
  });
};