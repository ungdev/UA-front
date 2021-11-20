import { toast } from 'react-toastify';
import { API } from '../utils/api';

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

const format = (users) => {
  return users.map((user) => ({
    ...user,
    fullname: `${user.firstname} ${user.lastname}`,
    tournamentName: user.team ? user.team.tournament.name : '',
    teamName: user.team ? user.team.name : user.type === 'spectator' ? '(spectateur)' : '',
    lockedLabel: user.team && user.team.lockedAt ? '✔' : '✖',
    paidLabel: user.hasPaid ? '✔' : '✖',
    scannedLabel: user.scanned ? '✔' : '✖',
    permissionsLabel: user.permissions.join(', ') || '',
  }));
};

const users = (state = initialState, action) => {
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

export const fetchUsers =
  (filters, search, page = 0) =>
  async (dispatch, getState) => {
    if (!filters) {
      return;
    }
    const searchFilters = {};
    Object.keys(filters).forEach((filter) => {
      if (filters[filter] !== 'all') {
        searchFilters[filter] = filters[filter];
      }
    });
    let res = await API.get(
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
    const formatUsers = format(res.data.users);
    dispatch({
      type: SET_USERS,
      users: formatUsers,
      total: res.data.totalItems,
      page,
      itemsPerPage: res.data.itemsPerPage,
      isFetched: true,
    });
  };

export const lookupUser = (user) => async (dispatch, getState) => {
  const res =
    user && getState().login.user?.permissions?.includes?.('admin')
      ? await API.get(`admin/users/${user.id}/carts`)
      : null;
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
          carts: res?.data,
        }
      : null,
  });
};

export const updateUser = (updateUser) => async (dispatch, getState) => {
  const users = getState().users.users;
  const updatedUsers = users.map((user) => (user.id === updateUser.id ? updateUser : user));
  const formatUsers = format(updatedUsers);
  dispatch({
    type: SET_USERS,
    users: formatUsers,
  });
};

export const validatePay = (id) => async (dispatch, getState) => {
  const userModal = getState().users.lookupUser;
  await API.post(`admin/users/${id}/force-pay`);
  toast.success('Paiement validé');
  dispatch(updateUser({ ...userModal, hasPaid: true }));
  dispatch(lookupUser({ ...userModal, hasPaid: true }));
};

export const saveUser = (id, body, username) => async (dispatch, getState) => {
  const userModal = getState().users.lookupUser;
  const { data: user } = await API.patch(`admin/users/${id}`, body);
  toast.success(`${username} mis à jour`);
  dispatch(updateUser({ ...userModal, ...user }));
};

export const refundCart = (id) => async (dispatch, getState) => {
  await API.post(`admin/carts/${id}/refund`);
  const userModal = getState().users.lookupUser;
  toast.success('Le panier a été marqué comme remboursé');
  dispatch(updateUser({ ...userModal, hasPaid: false }));
  dispatch(lookupUser({ ...userModal, hasPaid: false }));
};

export default users;
