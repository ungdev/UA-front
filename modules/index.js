import { combineReducers } from 'redux';
import loginModal from './loginModal';
import login from './login';

export default combineReducers({
  loginModal,
  login
});