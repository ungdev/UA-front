import { combineReducers } from 'redux';
import loginModal from './loginModal';
import login from './login';
import register from './register';
import team from './team';
import tournament from './tournament';
import items from './items';
import cart from './cart';

export default combineReducers({
  loginModal,
  login,
  register,
  team,
  tournament,
  items,
  cart,
});