import { toast } from 'react-toastify';

import { API } from '../utils/api';

export const SET_SEARCH_USER = 'userEntry/SET_SEARCH_USER';

const initialState = {
  searchUser: null,
};

const userEntry = (state = initialState, payload) => {
  switch (payload.type) {
    case SET_SEARCH_USER:
      return {
        ...state,
        searchUser: payload.searchUser,
      };
    default:
      return state;
  }
};

export const registerCashPayment = () => async (dispatch, getState) => {
  const currentUser = getState().userEntry.searchUser;
  if (!currentUser?.id) {
    throw new Error('Cannot validate payment of undefined user');
  }
  const { data: updatedUser } = await API.post(`admin/users/${currentUser.id}/force-pay`, {
    consume: true,
  });
  toast.success('Paiement validé');
  dispatch({
    type: SET_SEARCH_USER,
    searchUser: {
      ...currentUser,
      hasPaid: updatedUser.hasPaid,
      scannedAt: updatedUser.scannedAt,
    },
  });
};

export const searchUser = (userIdentifiable) => async (dispatch) => {
  const { data: list } = await API.get(`admin/users?search=${userIdentifiable}`);
  if (list?.users?.length !== 1) toast.error("L'utilisateur n'existe pas");
  else
    dispatch({
      type: SET_SEARCH_USER,
      searchUser: list.users[0],
    });
};

export const scan = (qrcode) => async (dispatch) => {
  try {
    const { data: user } = await API.post(`admin/scan`, {
      qrcode,
    });
    toast.success('Utilisateur scanné');
    dispatch({
      type: SET_SEARCH_USER,
      searchUser: user,
    });
  } catch (error) {
    toast.error(error);
  }
};

export const bypassQrScan = () => async (dispatch, getState) => {
  const currentUser = getState().userEntry.searchUser;
  if (!currentUser?.id) throw new Error('Cannot validate entry of undefined user');
  try {
    const { data: user } = await API.post(`admin/scan`, {
      userId: currentUser.id,
    });
    toast.success('Utilisateur scanné');
    dispatch({
      type: SET_SEARCH_USER,
      searchUser: user,
    });
  } catch (error) {
    toast.error(error);
  }
};

export default userEntry;
