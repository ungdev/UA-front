// eslint-disable-next-line import/named
import { combineReducers } from '@reduxjs/toolkit';
import loginModal from './loginModal';
import login from './login';
import register from './register';
import team from './team';
import tournament from './tournament';
import carts from './carts';
import cart from './cart';
import userEntry from './userEntry';
import users from './users';
import settings from './settings';
import partners from './partners';

export default combineReducers({
  loginModal,
  login,
  register,
  team,
  tournament,
  carts,
  cart,
  userEntry,
  users,
  settings,
  partners,
});