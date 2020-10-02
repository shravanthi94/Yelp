import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import event from './event';
import dashboard from './dashboard';
import resOrder from './resOrder';
import cusOrder from './cusOrder';

export default combineReducers({
  alert,
  auth,
  profile,
  event,
  dashboard,
  resOrder,
  cusOrder,
});
