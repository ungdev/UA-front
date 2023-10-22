import { toast } from 'react-toastify';
import { API } from '@/utils/api';
import { type Action, createSlice, type Dispatch } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';
import {
  Permission,
  UserType,
  UserWithTeamAndMessageAndTournamentInfo,
  UserWithTeamAndMessageAndTournamentInfoAndCartsAdmin,
} from '@/types';

interface UsersAction {
  isFetched: boolean;
  users: Array<UserWithTeamAndMessageAndTournamentInfo>;
  total: number;
  page: number;
  itemsPerPage: number;
  //filters: any;
  lookupUser: UserWithTeamAndMessageAndTournamentInfoAndCartsAdmin | null;
}

interface UserFilters extends Record<string, string | undefined> {
  type?: string;
  tournament?: string;
  locked?: string;
  payment?: string;
  scan?: string;
}

const initialState: UsersAction = {
  isFetched: false,
  users: [],
  total: 0,
  page: 0,
  itemsPerPage: 25,
  //filters: {},
  lookupUser: null,
};

const format = (users: Array<UserWithTeamAndMessageAndTournamentInfo>) => {
  return users.map((user) => ({
    ...user,
    fullname: `${user.firstname} ${user.lastname}`,
    tournamentName: user.team ? user.team.tournament.name : '',
    teamName: user.team ? user.team.name : user.type === UserType.spectator ? '(spectateur)' : '',
    lockedLabel: user.team && user.team.lockedAt ? '✔' : '✖',
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
      return {
        ...state,
        ...action.payload,
        users: format(action.payload.users),
        isFetched: true,
      };
    },
    setLookupUser: (state, action) => {
      return {
        ...state,
        lookupUser: action.payload,
      };
    },
  },
});

export const { setUsers, setLookupUser } = usersSlice.actions;

export const getTicketPrice = async (userId: string) => {
  return await API.get(`users/${userId}/ticket`);
};

export const fetchUsers =
  (filters?: UserFilters, search?: string, page = 0) =>
  async (dispatch: Dispatch) => {
    if (!filters) {
      return;
    }
    const searchFilters: UserFilters = {};
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
          : '&' + new URLSearchParams(searchFilters as Record<string, string>).toString()),
    );
    const formatUsers = format(res.users);
    dispatch(
      setUsers({
        users: formatUsers,
        total: res.totalItems,
        page,
        itemsPerPage: res.itemsPerPage,
        isFetched: true,
      }),
    );
  };

export const lookupUser =
  (user?: UserWithTeamAndMessageAndTournamentInfo) => async (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();
    const res =
      user && state.login.user?.permissions?.includes?.(Permission.admin)
        ? await API.get(`admin/users/${user.id}/carts`)
        : null;
    dispatch(
      setLookupUser(
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
      ),
    );
  };

export const updateUser = (updateUser: any) => async (dispatch: Dispatch, getState: () => RootState) => {
  const state = getState();
  const users: Array<UserWithTeamAndMessageAndTournamentInfo> = state.users.users;
  const updatedUsers = users.map((user) => (user.id === updateUser.id ? updateUser : user));
  const formatUsers = format(updatedUsers);
  dispatch(
    setUsers({
      users: formatUsers,
      total: state.users.total,
      page: state.users.page,
      itemsPerPage: state.users.itemsPerPage,
      isFetched: true,
    }),
  );
};

export const validatePay = (id: string) => async (dispatch: Dispatch, getState: () => RootState) => {
  const state = getState();
  const userModal = state.users.lookupUser;
  await API.post(`admin/users/${id}/force-pay`, {});
  toast.success('Paiement validé');
  dispatch(updateUser({ ...userModal, hasPaid: true }) as unknown as Action);
  dispatch(lookupUser({ ...userModal, hasPaid: true } as UserWithTeamAndMessageAndTournamentInfo) as unknown as Action);
};

export const saveUser =
  (id: string, body: object, username: string) => async (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();
    const userModal = state.users.lookupUser;
    const { data: user } = await API.patch(`admin/users/${id}`, body);
    toast.success(`${username} mis à jour`);
    dispatch(updateUser({ ...userModal, ...user, ...body }) as unknown as Action);
  };

export const createUser = (body: object, callback: () => void) => async () => {
  const user = await API.post(`admin/users`, body);
  toast.success(`${user.username} a été crée`);
  callback();
};

export const refundCart = (id: string) => async (dispatch: Dispatch, getState: () => RootState) => {
  const state = getState();
  await API.post(`admin/carts/${id}/refund`, {});
  const userModal = state.users.lookupUser;
  toast.success('Le panier a été marqué comme remboursé');
  dispatch(updateUser({ ...userModal, hasPaid: false }) as unknown as Action);
  dispatch(
    lookupUser({ ...userModal, hasPaid: false } as UserWithTeamAndMessageAndTournamentInfo) as unknown as Action,
  );
};

export default usersSlice.reducer;
