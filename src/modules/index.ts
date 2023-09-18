// eslint-disable-next-line import/named
import { combineReducers } from '@reduxjs/toolkit';
import loginModal from '@/modules/loginModal';
import login from '@/modules/login';
import register from '@/modules/register';
import redirect from '@/modules/redirect';
import team from '@/modules/team';
import tournament from '@/modules/tournament';
import carts from '@/modules/carts';
import cart from '@/modules/cart';
import userEntry from '@/modules/userEntry';
import users from '@/modules/users';
import settings from '@/modules/settings';
import partners from '@/modules/partners';
import admin from '@/modules/admin';

export default combineReducers({
  loginModal,
  login,
  register,
  redirect,
  team,
  tournament,
  carts,
  cart,
  userEntry,
  users,
  settings,
  partners,
  admin,
});
