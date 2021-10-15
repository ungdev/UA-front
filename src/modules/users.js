import { API } from '../utils/api';
import { SET_VISIBLE, SET_SEARCH_USER } from './userEntry';

export const SET_USERS = 'users/SET_USERS';

const initialState = {
  isFetched: false,
  users: [],
  total: 0,
  page: 0,
  filters: {},
};

const format = (users) => {
  return users.map((user) => ({
    ...user,
    fullname: `${user.firstname} ${user.lastname}`,
    tournamentName: user.team ? user.team.tournamentId : '',
    teamName: user.team ? user.team.name : user.type === 'visitor' ? '(spectateur)' : '',
    paidLabel: user.hasPaid ? '✔' : '✖',
    scannedLabel: user.scanned ? '✔' : '✖',
    permissionsLabel: user.permissions || '',
  }));
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        ...action,
      };
    default:
      return state;
  }
};

export const fetchUsers =
  (filters, search, page = 1) =>
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
        (!searchFilters.length ? '' : '&' + new URLSearchParams(searchFilters).toString()),
    );
    const formatUsers = format(res.data.users);
    dispatch({
      type: SET_USERS,
      users: formatUsers,
      total: res.data.totalItems,
      page,
      isFetched: true,
    });
  };

export const displayUser = (user) => async (dispatch) => {
  dispatch({
    type: SET_SEARCH_USER,
    searchUser: user,
  });
  dispatch({
    type: SET_VISIBLE,
    visible: true,
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
