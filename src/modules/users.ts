import { toast } from 'react-toastify';
import { API } from '@/utils/api';
import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '@/lib/store';
import {
  Commission,
  CommissionWithOrgas,
  OrgaRole,
  Permission,
  UserAge,
  UserFilters,
  UserType,
  UserWithTeamAndMessageAndTournamentInfo,
  UserWithTeamAndMessageAndTournamentInfoAndCartsAdmin,
} from '@/types';
import { uploadFile } from '@/utils/upload';
import { setUser } from '@/modules/login';

interface UsersAction {
  isFetched: boolean;
  users: Array<UserWithTeamAndMessageAndTournamentInfo>;
  total: number;
  page: number;
  itemsPerPage: number;
  //filters: any;
  lookupUser: UserWithTeamAndMessageAndTournamentInfoAndCartsAdmin | null;
  orgas: CommissionWithOrgas[] | null;
}

const initialState: UsersAction = {
  isFetched: false,
  users: [],
  total: 0,
  page: 0,
  itemsPerPage: 25,
  //filters: {},
  lookupUser: null,
  orgas: null,
};

const format = (users: Array<UserWithTeamAndMessageAndTournamentInfo>) => {
  function userType(type: string) {
    switch (type) {
      case UserType.player:
        return 'Joueur';
      case UserType.coach:
        return 'Coach';
      case UserType.spectator:
        return 'Spectateur';
      default:
        return type;
    }
  }

  return users.map((user) => {
    console.log('User OrgaData:', user.orga); // <-- Log pour voir ce que contient user.orga
    console.log('Main Commission:', user.orga?.mainCommission); // <-- Log spécifique sur la commission

    return {
      ...user,
      fullname: `${user.firstname} ${user.lastname}`,
      tournamentName: user.team ? user.team.tournament.name : '',
      teamName: user.team ? user.team.name : '',
      lockedLabel: user.team && user.team.lockedAt ? '✔' : '✖',
      paidLabel: user.hasPaid ? '✔' : '✖',
      scannedLabel: user.scannedAt ? '✔' : '✖',
      permissionsLabel: user.permissions.join(', ') || '',
      commission: user.orga?.mainCommission || '',
      status: user.type ? userType(user.type) : '',
    };
  });
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
    setOrgas: (state, action) => {
      return {
        ...state,
        orgas: action.payload,
      };
    },
  },
});

export const { setUsers, setLookupUser, setOrgas } = usersSlice.actions;

export const getTicketPrice = async (userId: string) => {
  return await API.get(`users/${userId}/ticket`);
};

export const fetchUsers =
  (filters?: UserFilters, search?: string, page = 0): AppThunk =>
  async (dispatch) => {
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
        !searchFilters.scan &&
        !searchFilters.permissions &&
        !searchFilters.age &&
        !searchFilters.commission
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
  (user?: UserWithTeamAndMessageAndTournamentInfo): AppThunk =>
  async (dispatch, getState) => {
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
              customMessage: user.customMessage,
              carts: res,
              orga: user.orga,
            }
          : null,
      ),
    );
  };

export const updateUser =
  (updateUser: UserWithTeamAndMessageAndTournamentInfo): AppThunk =>
  async (dispatch, getState) => {
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

export const validatePay =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const userModal = state.users.lookupUser;
    await API.post(`admin/users/${id}/force-pay`, {});
    toast.success('Paiement validé');
    if (userModal) {
      dispatch(updateUser({ ...userModal, hasPaid: true }));
      dispatch(lookupUser({ ...userModal, hasPaid: true } as UserWithTeamAndMessageAndTournamentInfo));
    }
  };

export const saveUser =
  (
    id: string,
    body: {
      type?: UserType;
      age?: UserAge;
      permissions?: Permission[];
      place?: string | null;
      discordId?: string | null;
      customMessage?: string | null;
      username?: string;
      lastname?: string;
      firstname?: string;
      email?: string;
      orgaRoles?: OrgaRole[];
      orgaMainCommission?: Commission | null;
    },
    username: string,
  ): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const userModal = state.users.lookupUser;
    const { data: user } = await API.patch(`admin/users/${id}`, {
      ...body,
      orgaRoles: body.orgaRoles?.map((role: OrgaRole) => ({
        commissionRole: role.commissionRole,
        commission: role.commission.id,
      })),
      orgaMainCommission: body.orgaMainCommission?.id || null,
    });
    toast.success(`${username} mis à jour`);
    dispatch(
      updateUser({
        ...userModal,
        ...user,
        ...{
          ...body,
          orga: user.permissions.includes(Permission.orga)
            ? {
                roles: body.orgaRoles,
                mainCommission: body.orgaMainCommission?.id || body.orgaMainCommission || '', // Always a string
              }
            : null,
        },
      }),
    );
    if (id === state.login.user?.id) {
      dispatch(setUser(await API.get(`users/current`)));
    }
  };

export const createUser =
  (body: object, callback: () => void): AppThunk =>
  async () => {
    const user = await API.post(`admin/users`, body);
    toast.success(`${user.username} a été crée`);
    callback();
  };

export const refundCart =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    await API.post(`admin/carts/${id}/refund`, {});
    const userModal = state.users.lookupUser;
    toast.success('Le panier a été marqué comme remboursé');
    if (userModal) {
      dispatch(updateUser({ ...userModal, hasPaid: false }));
      dispatch(lookupUser({ ...userModal, hasPaid: false } as UserWithTeamAndMessageAndTournamentInfo));
    }
  };

export const uploadProfilePicture = async (
  blob: Blob,
  displayName: boolean,
  displayUsername: boolean,
  displayPhoto: boolean,
) => {
  const file = new File([blob], `test.png`, { type: 'image/png' });
  const { filename } = await API.patch(`admin/users/trombi`, { displayName, displayUsername, displayPhoto });
  await uploadFile(file, filename, 'orga');
};

export const fetchOrgas = (): AppThunk => async (dispatch) => {
  const res = await API.get('users/orgas');
  dispatch(setOrgas(res));
};

export default usersSlice.reducer;
