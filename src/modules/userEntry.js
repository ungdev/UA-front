import { toast } from 'react-toastify';

import Router from 'next/router';

import { API } from '../utils/api';
import { updateUser } from './users';
import { saveToken, SET_USER } from './login';

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

export const scan = (barcode) => async (dispatch) => {
  const res = await API.post(`entry/scan?barcode=${barcode}`);
  toast.success('Utilisateur scanné');
  dispatch({
    type: SET_BARCODE_USER,
    barcodeUser: res.data,
  });
};

export const validatePay = (id) => async (dispatch, getState) => {
  const userModal = getState().userEntry.searchUser;
  await API.post(`admin/users/${id}/force-pay`);
  toast.success('Paiement validé');
  dispatch(updateUser({ ...userModal, hasPaid: true }));
  dispatch({
    type: SET_VISIBLE,
    visible: false,
  });
};

export const saveUser = (id, body, username) => async (dispatch, getState) => {
  const userModal = getState().userEntry.searchUser;
  await API.put(`admin/users/${id}`, body);
  toast.success(`${username} mis à jour`);
  dispatch(updateUser({ ...userModal, ...body }));
  dispatch({
    type: SET_VISIBLE,
    visible: false,
  });
};

export const refundCart = (id) => async (dispatch, getState) => {
  await API.put(`carts/${id}`);
  const userModal = getState().userEntry.searchUser;
  toast.success('Le panier a été marqué comme remboursé');
  dispatch(updateUser({ ...userModal, hasPaid: false }));
  dispatch({
    type: SET_VISIBLE,
    visible: false,
  });
};

export const connectAs = (id) => async (dispatch, getState) => {
  console.log(getState());
  localStorage.setItem('utt-arena-admin-token', getState().login.user.token);
  const res = await API.post(`admin/auth/login/${id}`);
  dispatch(saveToken(res.data.token));
  localStorage.setItem('utt-arena-userid', res.data.user.id);
  Router.push('/dashboard');
  dispatch({
    type: SET_USER,
    user: res.data.user,
  });
};
