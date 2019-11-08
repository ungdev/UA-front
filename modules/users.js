import { API } from '../utils';
import { SET_VISIBLE, SET_SEARCH_USER } from './userEntry';

export const SET_USERS = 'users/SET_USERS';
export const SET_FETCH = 'users/SET_FETCH';

const initialState = {
  all: [],
  current: [],
  page: 0,
  isFetched: false,
  params: {},
  filters: {},
};

const format = (users) => {
  return users.map((user) => ({
    ...user,
    tournamentName: user.team ? user.team.tournament.shortName : 'Aucun',
    teamName: user.team ? user.team.name :  user.type,
    isPaid: user.isPaid ? '✔' : '✖',
  }));
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        all: action.all,
      };
    case SET_FETCH:
      return {
        ...state,
        ...action,
      };
    default:
      return state;
  }
};

export const fetchUsers = () => async (dispatch, getState) => {
  const page = getState().users.page;
  const res = await API.get(`admin/users?page=${page}`);
  const formatUsers = format(res.data.users);
  dispatch({
    type: SET_FETCH,
    current: formatUsers,
    all: [formatUsers],
    params: {
      total: res.data.total,
      first: res.data.limit - res.data.pageSize + 1,
      last: res.data.limit,
      pageSize: res.data.pageSize,
    },
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

export const goToPage = (page, filters) => async (dispatch, getState) => {
  if (page < 0) {
    return;
  }
  const { all: totalPages, params, page: previousPage } = getState().users;
  if (page > params.total / params.pageSize) {
    return;
  }
  const realLast = params.last + params.pageSize > params.total ? params.total : params.last + params.pageSize;
  const newParams = {
    ...params,
    first: previousPage > page ? params.first - params.pageSize : params.last + 1,
    last: previousPage > page ? params.first - 1 : realLast,
  };
  if (totalPages.length > page) {
    dispatch({
      type: SET_FETCH,
      all: totalPages,
      current: totalPages[page],
      page,
      params: newParams,
    });
  }
  else {
    const res = await API.get('admin/users', { ...filters, page });
    const formatUsers = format(res.data.users);
    totalPages.push(formatUsers);
    dispatch({
      type: SET_FETCH,
      current: formatUsers,
      all: totalPages,
      page,
      params: newParams,
    });
  }
};

export const filterUsers = (filters) => async (dispatch) => {
  const res = await API.get('admin/users',filters);
  const formatUsers = format(res.data.users);
  dispatch({
    type: SET_FETCH,
    current: formatUsers,
    all: [formatUsers],
    params: {
      total: res.data.total,
      first: res.data.limit - res.data.pageSize + 1,
      last: res.data.limit,
      pageSize: res.data.pageSize,
    },
    page: 0,
  });
};