import { toast } from 'react-toastify';

import { API } from '@/utils/api';
import { UserWithTeamAndMessageAndTournamentInfo } from '@/types';
import { createSlice, type Dispatch } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

interface UserEntryAction {
  searchUser: UserWithTeamAndMessageAndTournamentInfo | null;
}

const initialState: UserEntryAction = {
  searchUser: null,
};

export const userEntrySlice = createSlice({
  name: 'userEntry',
  initialState,
  reducers: {
    setSearchUser: (state, action) => {
      state.searchUser = action.payload;
          },
  },
});

export const { setSearchUser } = userEntrySlice.actions;

export const registerCashPayment = () => async (dispatch: Dispatch, state: RootState) => {
  const currentUser = state.userEntry.searchUser;
  if (!currentUser?.id) {
    throw new Error('Cannot validate payment of undefined user');
  }
  const { data: updatedUser } = await API.post(`admin/users/${currentUser.id}/force-pay`, {
    consume: true,
  });
  toast.success('Paiement validé');
  dispatch(
    setSearchUser({
      ...currentUser,
      hasPaid: updatedUser.hasPaid,
      scannedAt: updatedUser.scannedAt,
    }),
  );
};

export const searchUser = (userIdentifiable: string) => async (dispatch: Dispatch) => {
  const { data: list } = await API.get(`admin/users?search=${userIdentifiable}`);
  if (list?.users?.length !== 1) toast.error("L'utilisateur n'existe pas");
  else dispatch(setSearchUser(list.users[0]));
};

export const scan = (qrcode: string) => async (dispatch: Dispatch) => {
  try {
    const { data: user } = await API.post(`admin/scan`, {
      qrcode,
    });
    toast.success('Utilisateur scanné');
    dispatch(setSearchUser(user));
  } catch (error: any) {
    toast.error(error);
  }
};

export const bypassQrScan = () => async (dispatch: Dispatch, state: RootState) => {
  const currentUser = state.userEntry.searchUser;
  if (!currentUser?.id) throw new Error('Cannot validate entry of undefined user');
  try {
    const { data: user } = await API.post(`admin/scan`, {
      userId: currentUser.id,
    });
    toast.success('Utilisateur scanné');
    dispatch(setSearchUser(user));
  } catch (error: any) {
    toast.error(error);
  }
};

export default userEntrySlice.reducer;
