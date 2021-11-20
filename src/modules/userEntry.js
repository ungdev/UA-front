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
  try {
    const res = await API.post(`admin/scan`, {
      qrcode,
    });
    toast.success('Utilisateur scanné');
    return res.data;
  } catch (error) {
    toast.error(error);
  }
};

export default userEntry;
