import { toast } from 'react-toastify';
import { API } from '@/utils/api';
import { createSlice, type Dispatch } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';
import { Permission, UserType, UserWithTeam } from '@/types';

interface UsersAction {
  isFetched: boolean;
  users: Array<any>;
  total: number;
  page: number;
  itemsPerPage: number;
  filters: any;
  lookupUser: any;
}

const initialState: UsersAction = {
  isFetched: false,
  users: [],
  total: 0,
  page: 0,
  itemsPerPage: 25,
  filters: {},
  lookupUser: null,
};

const format = (users: Array<UserWithTeam>) => {
  return users.map((user) => ({
    ...user,
    fullname: `${user.firstname} ${user.lastname}`,
    tournamentName: user.team ? user.team.tournament.name : '',
    teamName: user.team ? user.team.name : user.type === UserType.spectator ? '(spectateur)' : '',
    lockedLabel: user.team && user.team.locked ? '✔' : '✖',
    paidLabel: user.hasPaid ? '✔' : '✖',
    scannedLabel: user.scannedAt ? '✔' : '✖',
    permissionsLabel: user.permissions.join(', ') || '',
  }));
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state = {
        ...state,
        ...action.payload,
        users: format(action.payload.users),
        isFetched: true,
      };
    },
    setLookupUser: (state, action) => {
      state = {
        ...state,
        lookupUser: action.payload,
      };
    },
  },
});

export const { setUsers, setLookupUser } = usersSlice.actions;

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
    dispatch(setUsers(
      {
        users: formatUsers,
        total: res.total,
        page: res.page,
        itemsPerPage: res.itemsPerPage,
        isFetched: true,
      },
    ));
  };

export const lookupUser = (user: any) => async (dispatch: Dispatch, state: RootState) => {
  const res =
    user && state.login.user?.permissions?.includes?.(Permission.admin) ? await API.get(`admin/users/${user.id}/carts`) : null;
  dispatch(setLookupUser(
    user
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
  ));
};

export const updateUser = (updateUser: any) => async (dispatch: Dispatch, state: RootState) => {
  const users: Array<any> = state.users.users;
  const updatedUsers = users.map((user) => (user.id === updateUser.id ? updateUser : user));
  const formatUsers = format(updatedUsers);
  dispatch(setUsers(
    {
      users: formatUsers,
      total: state.users.total,
      page: state.users.page,
      itemsPerPage: state.users.itemsPerPage,
      isFetched: true,
    },
  ));
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

export default usersSlice.reducer;
