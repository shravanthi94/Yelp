import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import event from './event';
import dashboard from './dashboard';
import resOrder from './resOrder';
import cusOrder from './cusOrder';
import restaurant from './restaurant';
import search from './search';
import customer from './customer';

export default combineReducers({
  alert,
  auth,
  profile,
  event,
  dashboard,
  resOrder,
  cusOrder,
  restaurant,
  search,
  customer,
});
