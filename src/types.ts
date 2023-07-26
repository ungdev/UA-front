// Types for the whole project using the API docs
// https://arena.utt.fr/api/docs/

export interface Partner {
  name: string;
  description: string;
  image: string;
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
  stream,
  entry,
  anim,
  admin,
}

export interface Team {
  id: string;
  name: string;
  tournamentId: string;
  captainId: string;
  locked: Date | null;
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
}

export interface UserRestricted {
  id: string;
  username: string;
  type: UserType;
  hasPaid: boolean;
}

export interface UserWithTeam extends User {
  team: Team;
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
    },
    captainId: string;
    locked: Date | null;
  }
}

export interface Cart {
  id: string;
  userId: string;
  transactionState: TransactionState;
  transactionId: number | null;
  paidAt: Date | null;
}

export interface CartItem {
  id: string;
  quantity: number;
  price: number;
  reducedPrice: number | null;
  forcePaid: boolean;
  cartId: string;
  itemId: number;
  forUser: {
    id: string;
    username: string; 
  }
}

export interface CartPost {
  tickets: {
    userIds: string[];
    attendant: {
      firstname: string;
      lastname: string;
    };
  };
  supplements: {
    itemId: number;
    quantity: number;
  }[];
}

export interface CartWithCartItems extends Cart {
  cartItems: CartItem[];
}

export interface Item {
  id: number;
  name: string;
  category: string;
  attribute: string | null;
  price: number;
  infos: string | null;
  image: string | null;
  left: number | null;
}

export interface Tournament {
  id: string;
  name: string;
  shortName: string;
  maxPlayers: number;
  playersPerTeam: number;
  lockedTeamsCount: number;
  placesLeft: number;
}

export enum UserType {
  'player',
  'coach',
  'spectator',
}

export enum UserAge {
  child,
  adult,
}

export enum TransactionState {
  pending,
  paid,
  canceled,
  refused,
  refunded,
  authorization,
}
