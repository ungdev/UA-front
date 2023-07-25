import { toast } from 'react-toastify';

import { API } from '@/utils/api';
import { User } from '@/types';
import { Action, Dispatch } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

export const SET_SEARCH_USER = 'userEntry/SET_SEARCH_USER';

const initialState = {
  searchUser: null,
};

interface UserEntryAction extends Action {
  searchUser: User;
}

const userEntry = (state = initialState, action: UserEntryAction) => {
  switch (action.type) {
    case SET_SEARCH_USER:
      return {
        ...state,
        searchUser: action.searchUser,
      };
    default:
      return state;
  }
};

export const registerCashPayment = () => async (dispatch: Dispatch, getState: RootState) => {
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

export const searchUser = (userIdentifiable: any) => async (dispatch: Dispatch) => {
  const { data: list } = await API.get(`admin/users?search=${userIdentifiable}`);
  if (list?.users?.length !== 1) toast.error("L'utilisateur n'existe pas");
  else
    dispatch({
      type: SET_SEARCH_USER,
      searchUser: list.users[0],
    });
};

export const scan = (qrcode: any) => async (dispatch: Dispatch) => {
  try {
    const { data: user } = await API.post(`admin/scan`, {
      qrcode,
    });
    toast.success('Utilisateur scanné');
    dispatch({
      type: SET_SEARCH_USER,
      searchUser: user,
    });
  } catch (error: any) {
    toast.error(error);
  }
};

export const bypassQrScan = () => async (dispatch: Dispatch, getState: RootState) => {
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
  } catch (error: any) {
    toast.error(error);
  }
};

export default userEntry;
