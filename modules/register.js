import { toast } from 'react-toastify';
import Router from 'next/router';

import { setLoginModalVisible } from './loginModal';
import { axiosAPI } from '../utils';

import { saveToken } from './login';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const register = user => async dispatch => {
  if (user.password !== user.passwordConfirmation) {
    toast.error('PASSWORD_MISMATCH');
    return;
  }
  try {
    await axiosAPI().post('user', user);
    toast.success('Inscription réussie');
    dispatch(setLoginModalVisible(false));
  } catch (err) {
    toast.error(err.response.data.error);
  }
};

// export const validate = token => {
//   return async dispatch => {
//     try {
//       const res = await axiosAPI().post('user/validate', { token });

//       await dispatch(saveToken(res.data.token));

//       dispatch(
//         notifActions.notifSend({
//           message: 'Inscription validée',
//           dismissAfter: 2000
//         })
//       );
//     } catch (err) {
//       console.log(err.response.data);
//       dispatch(
//         notifActions.notifSend({
//           message: errorToString(err.response.data.error),
//           kind: 'danger',
//           dismissAfter: 2000
//         })
//       );
//     }
//   };
// };