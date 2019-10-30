import { combineReducers } from 'redux';
import loginModal from './loginModal';
import login from './login';
import register from './register';
import team from './team';
import tournament from './tournament';
import carts from './carts';
import items from './items';
import cart from './cart';
import userEntry from './userEntry';
import infos from './infos';
import users from './users';

export default combineReducers({
  loginModal,
  login,
  register,
  team,
  tournament,
  carts,
  items,
  cart,
  userEntry,
  infos,
  users,
});