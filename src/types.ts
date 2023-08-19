// Types for the whole project using the API docs
// https://arena.utt.fr/api/docs/

export interface Partner {
  name: string;
  logo: string;
  link: string;
}

export interface Settings {
  login: boolean;
  shop: boolean;
}

export interface RegisterUser {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
  age: string;
}

export interface UserAttendant {
  id: string;
  firstname: string;
  lastname: string;
}

export enum Permission {
  stream = 'stream',
  entry = 'entry',
  anim = 'anim',
  admin = 'admin',
  repo = 'repo',
}

export interface Team {
  id: string;
  name: string;
  tournamentId: string;
  captainId: string;
  lockedAt: Date | null;
}

export interface TeamWithTournamentInfo extends Team {
  tournament: {
    id: string;
    name: string;
  };
}

export interface TeamWithUsersRestricted extends Team {
  players: UserRestricted[];
  coaches: UserRestricted[];
}

export interface TeamWithUsers extends Team {
  players: User[];
  coaches: User[];
  askingUsers: User[];
}

export interface User {
  id: string;
  username: string;
  type: UserType;
  hasPaid: boolean;
  firstname: string;
  lastname: string;
  email: string;
  permissions: Permission[];
  place: string;
  scannedAt: Date | null;
  discordId: string | null;
  teamId: string | null;
  askingTeamId: string | null;
  attendant: UserAttendant;
  age: UserAge;
}

export interface UserEdit {
  username: string;
  password: string;
  newPassword: string;
}

export interface UserRestricted {
  id: string;
  username: string;
  type: UserType;
  hasPaid: boolean;
}

export interface UserWithTeam extends User {
  team: TeamWithTournamentInfo;
}

export interface UserWithMessage extends User {
  customMessage: string | null;
}

export interface UserWithTeamAndMessageAndTournamentInfo extends User {
  customMessage: string | null;
  team: {
    id: string;
    name: string;
    tournament: {
      id: string;
      name: string;
    };
    captainId: string;
    locked: Date | null;
  };
}

export interface CartWithCartItemsAdmin extends CartWithCartItems {
  totalPrice?: number;
  cartItems: (DetailedCartItem & { forUser: User; item: Item })[];
}

export type DetailedCartItem = CartItem & {
  item: Item;
  forUser: User;
};

export interface UserWithTeamAndMessageAndTournamentInfoAndCartsAdmin extends UserWithTeamAndMessageAndTournamentInfo {
  carts: CartWithCartItemsAdmin[];
}

export interface AttendantInfo {
  firstname: string;
  lastname: string;
}

export interface Cart {
  id: string;
  userId: string;
  transactionState: TransactionState;
  transactionId: number | null;
  paidAt: Date | null;
  supplements: {
    itemId: string;
    quantity: number;
  }[];
  tickets: {
    userIds: string[];
    attendant: AttendantInfo;
  };
}

export interface CartItem {
  id: string;
  quantity: number;
  price: number;
  reducedPrice: number | null;
  forcePaid: boolean;
  cartId: string;
  itemId: string;
  forUser: {
    id: string;
    username: string;
  };
}

export interface CartPost {
  tickets: {
    userIds: string[];
    attendant: AttendantInfo | undefined;
  };
  supplements: {
    itemId: string;
    quantity: number;
  }[];
}

export interface CartWithCartItems extends Cart {
  cartItems: CartItem[];
}

export interface Item {
  id: string;
  name: string;
  category?: string;
  attribute?: string | null;
  attributes?: string[] | null;
  price: number;
  infos: string | null;
  image: string | null;
  left: number | null;
}

export interface Caster {
  id: string;
  name: string;
}

export interface Tournament {
  id: string;
  name: string;
  shortName: string;
  maxPlayers: number;
  playersPerTeam: number;
  lockedTeamsCount: number;
  placesLeft: number;
  rules: string | null;
  image: string | null;
  infos: string | null;
  format: string | null;
  backgroundImage: string | null;
  cashprize: number | null;
  cashprizeDetails: string | null;
  casters: Caster[] | null;
  teams: TeamWithUsersRestricted[];
}

export enum UserType {
  player = 'player',
  coach = 'coach',
  spectator = 'spectator',
  orga = 'orga',
  attendant = 'attendant',
}

export enum UserAge {
  child = 'child',
  adult = 'adult',
}

export enum TransactionState {
  pending = 'pending',
  paid = 'paid',
  canceled = 'canceled',
  refused = 'refused',
  refunded = 'refunded',
  authorization = 'authorization',
}
