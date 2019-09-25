import { combineReducers } from 'redux';
import loginModal from './loginModal';
import login from './login';
import register from './register';

export default combineReducers({
  loginModal,
  login,
  register,
});