import { toast } from 'react-toastify';
import { API } from '@/utils/api';
import { UserWithTeamAndMessageAndTournamentInfo } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '@/lib/store';

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

export const registerCashPayment = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
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

export const searchUser =
  (userIdentifiable: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await API.get(`admin/users?search=${userIdentifiable}`);
      const list = response;
      if (!list || !Array.isArray(list.users)) {
        toast.error('Aucun utilisateur trouvé');
      } else {
        dispatch(setSearchUser(list.users[0]));
      }
    } catch (error) {
      toast.error("Erreur lors de la recherche de l'utilisateur");
      console.error(error);
    }
  };

export const scan =
  (qrcode: string): AppThunk =>
  async (dispatch) => {
    try {
      const user = await API.post(`admin/scan`, { qrcode });
      toast.success('Utilisateur scanné');
      dispatch(setSearchUser(user));
    } catch (error) {
      toast.error("Erreur lors de la recherche de l'utilisateur");
      console.error(error);
    }
  };

export const bypassQrScan = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const currentUser = state.userEntry.searchUser;
  if (!currentUser?.id) throw new Error('Cannot validate entry of undefined user');
  try {
    const { data: user } = await API.post(`admin/scan`, {
      userId: currentUser.id,
    });
    toast.success('Utilisateur scanné');
    dispatch(setSearchUser(user));
  } catch (error) {
    toast.error("Erreur lors de la recherche de l'utilisateur");
    console.error(error);
  }
};

export const leavePanel = (): AppThunk => async (dispatch) => {
  dispatch(setSearchUser(null));
};

export default userEntrySlice.reducer;
