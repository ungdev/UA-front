import { toast } from 'react-toastify';
import { API } from '@/utils/api';
import type { Action, Dispatch } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

export const SET_USERS = 'users/SET_USERS';
export const SET_LOOKUP_USER = 'users/LOOKUP_USER';

const initialState = {
  isFetched: false,
  users: [],
  total: 0,
  page: 0,
  itemsPerPage: 25,
  filters: {},
  lookupUser: null,
};

const format = (users: Array<any>) => {
  return users.map((user) => ({
    ...user,
    fullname: `${user.firstname} ${user.lastname}`,
    tournamentName: user.team ? user.team.tournament.name : '',
    teamName: user.team ? user.team.name : user.type === 'spectator' ? '(spectateur)' : '',
    lockedLabel: user.team && user.team.lockedAt ? '✔' : '✖',
    paidLabel: user.hasPaid ? '✔' : '✖',
    scannedLabel: user.scannedAt ? '✔' : '✖',
    permissionsLabel: user.permissions.join(', ') || '',
  }));
};

interface LookupUserAction extends Action {
  lookupUser: any;
}

const users = (state = initialState, action: LookupUserAction) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        ...action,
      };
    case SET_LOOKUP_USER:
      return {
        ...state,
        lookupUser: action.lookupUser,
      };
    default:
      return state;
  }
};

export const getTicketPrice = async (userId: string) => {
  const res = await API.get(`/users/${userId}/ticket`);
  return res;
};

export const fetchUsers =
  (filters: any, search: string, page = 0) =>
  async (dispatch: Dispatch) => {
    if (!filters) {
      return;
    }
    const searchFilters: any = {};
    Object.keys(filters).forEach((filter) => {
      if (filters[filter] !== 'all') {
        searchFilters[filter] = filters[filter];
      }
    });
    const res = await API.get(
      `admin/users` +
        `?page=${page}` +
        (search === '' ? '' : '&search=' + search) +
        (!searchFilters.type &&
        !searchFilters.tournament &&
        !searchFilters.locked &&
        !searchFilters.payment &&
        !searchFilters.scan
          ? ''
          : '&' + new URLSearchParams(searchFilters).toString()),
    );
    const formatUsers = format(res.users);
    dispatch({
      type: SET_USERS,
      users: formatUsers,
      total: res.totalItems,
      page,
      itemsPerPage: res.itemsPerPage,
      isFetched: true,
    });
  };

export const lookupUser = (user: any) => async (dispatch: Dispatch, state: RootState) => {
  const res =
    user && state.login.user?.permissions?.includes?.('admin') ? await API.get(`admin/users/${user.id}/carts`) : null;
  dispatch({
    type: SET_LOOKUP_USER,
    lookupUser: user
      ? {
          id: user.id,
          lastname: user.lastname,
          firstname: user.firstname,
          username: user.username,
          email: user.email,
          type: user.type,
          age: user.age,
          permissions: user.permissions,
          hasPaid: user.hasPaid,
          place: user.place,
          discordId: user.discordId,
          team: user.team,
          attendant: user.attendant,
          customMessage: user.customMessage,
          carts: res,
        }
      : null,
  });
};

export const updateUser = (updateUser: any) => async (dispatch: Dispatch, state: RootState) => {
  const users: Array<any> = state.users.users;
  const updatedUsers = users.map((user) => (user.id === updateUser.id ? updateUser : user));
  const formatUsers = format(updatedUsers);
  dispatch({
    type: SET_USERS,
    users: formatUsers,
  });
};

export const validatePay = (id: string) => async (dispatch: any, state: RootState) => {
  const userModal = state.users.lookupUser;
  await API.post(`admin/users/${id}/force-pay`, {});
  toast.success('Paiement validé');
  dispatch(updateUser({ ...userModal, hasPaid: true }));
  dispatch(lookupUser({ ...userModal, hasPaid: true }));
};

export const saveUser = (id: string, body: any, username: string) => async (dispatch: any, state: RootState) => {
  const userModal = state.users.lookupUser;
  const { data: user } = await API.patch(`admin/users/${id}`, body);
  toast.success(`${username} mis à jour`);
  dispatch(updateUser({ ...userModal, ...user }));
};

export const refundCart = (id: string) => async (dispatch: any, state: RootState) => {
  await API.post(`admin/carts/${id}/refund`, {});
  const userModal = state.users.lookupUser;
  toast.success('Le panier a été marqué comme remboursé');
  dispatch(updateUser({ ...userModal, hasPaid: false }));
  dispatch(lookupUser({ ...userModal, hasPaid: false }));
};

export default users;