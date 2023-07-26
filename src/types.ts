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

export interface User {
  id: string;
  username: string | null;
  firstname: string;
  lastname: string;
  email: string | null;
  password: string | null;
  type: UserType | null;
  age: UserAge;
  discordId: string | null;
  permissions: string | null;
  registerToken: string | null;
  resetToken: string | null;
  place: string | null;
  customMessage: string | null;
  scannedAt: Date | null;
  attendantId: string | null;
  teamId: string | null;
  askingTeamId: string | null;
  createdAt: Date;
  updatedAt: Date;
  compumsaCode: number | null;
}

export interface Cart {
  id: string;
  userId: string;
  transactionState: TransactionState;
  transactionId: number | null;
  paidAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  itemId: string;
  quantity: number;
  price: number;
  reducedPrice?: number;
  forUserId: string;
}

export interface Supplement {}

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
