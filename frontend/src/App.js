import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Landing from './components/LandingPage/Landing';
import SearchRestaurants from './components/LandingPage/Results';

import Login from './components/Customer/Login';
import Signup from './components/Customer/Signup';

import ResLogin from './components/Restaurant/Login';
import ResSignup from './components/Restaurant/Signup';

import Profile from './components/Profile/Profile';
import CreateProfile from './components/profile-forms/CreateProfile';
import updateAbout from './components/profile-forms/EditAbout';
import updateContact from './components/profile-forms/EditContact';
import OrdersCus from './components/Customer/Orders';
import OrdersCusRec from './components/Customer/OrdersRec';
import OrdersCusPrep from './components/Customer/OrdersPrep';
import OrdersCusPick from './components/Customer/OrdersPick';
import OrdersCusDel from './components/Customer/OrdersDel';

import AllRest from './components/RestaurantTab/AllRestaurants';
import Restaurant from './components/RestaurantTab/Restaurant';
import Placeorder from './components/RestaurantTab/Placeorder';
import AddReview from './components/RestaurantTab/AddReview';

import Dashboard from './components/Dashboard/Dashboard';
import RestaurantUpdateProfile from './components/Dashboard-forms/UpdateProfile';
import AddDish from './components/Dashboard-forms/AddDish';
import UpdateDish from './components/Dashboard-forms/UpdateItem';
import ViewReview from './components/Dashboard-forms/ViewReview';
import OrdersRes from './components/Restaurant/Orders';
import NewOrders from './components/Restaurant/OrdersNew';
import OrdersDelivered from './components/Restaurant/OrdersDelivered';
import OrdersCancelled from './components/Restaurant/OrdersCancelled';

import Event from './components/events/Event';
import EventDetails from './components/events/EventDetails';
import CreateEvent from './components/events/CreateEvent';
import RegisteredEvent from './components/events/RegisteredEvent';
import SubmittedEvent from './components/events/SubmittedEvent';
import AttendeeList from './components/events/AttendeeList';

import PrivateRoute from './components/routing/PrivateRoute';
import Alert from './components/layout/Alert';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import { loadUser, loadRestaurant } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  //  Component did mount
  useEffect(() => {
    if (localStorage.usertype === 'customer') {
      store.dispatch(loadUser());
    } else {
      store.dispatch(loadRestaurant());
    }
  });
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <Route
            exact
            path='/search/restaurants/:query'
            component={SearchRestaurants}
          />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/restaurant/login' component={ResLogin} />
              <Route exact path='/restaurant/signup' component={ResSignup} />
              <PrivateRoute exact path='/profile' component={Profile} />
              <PrivateRoute
                exact
                path='/update/basic'
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path='/update/about'
                component={updateAbout}
              />
              <PrivateRoute
                exact
                path='/update/contact'
                component={updateContact}
              />

              <PrivateRoute
                exact
                path='/restaurant/profile'
                component={Dashboard}
              />
              <PrivateRoute
                exact
                path='/restaurant/update/basic'
                component={RestaurantUpdateProfile}
              />
              <PrivateRoute
                exact
                path='/restaurant/add/dish'
                component={AddDish}
              />
              <PrivateRoute
                exact
                path='/restaurant/item/update'
                component={UpdateDish}
              />
              <PrivateRoute
                exact
                path='/restaurant/view/reviews'
                component={ViewReview}
              />
              <PrivateRoute
                exact
                path='/restaurant/orders'
                component={OrdersRes}
              />
              <PrivateRoute
                exact
                path='/restaurant/orders/new'
                component={NewOrders}
              />
              <PrivateRoute
                exact
                path='/restaurant/orders/delivered'
                component={OrdersDelivered}
              />
              <PrivateRoute
                exact
                path='/restaurant/orders/cancelled'
                component={OrdersCancelled}
              />

              <PrivateRoute
                exact
                path='/customer/orders'
                component={OrdersCus}
              />
              <PrivateRoute
                exact
                path='/customer/orders/received'
                component={OrdersCusRec}
              />
              <PrivateRoute
                exact
                path='/customer/orders/preparing'
                component={OrdersCusPrep}
              />
              <PrivateRoute
                exact
                path='/customer/orders/pickup'
                component={OrdersCusPick}
              />
              <PrivateRoute
                exact
                path='/customer/orders/delivery'
                component={OrdersCusDel}
              />

              <Route exact path='/event' component={Event} />
              <Route
                exact
                path='/event/details/:event_name'
                component={EventDetails}
              />
              <PrivateRoute
                exact
                path='/event/create'
                component={CreateEvent}
              />
              <PrivateRoute
                exact
                path='/event/registered'
                component={RegisteredEvent}
              />
              <PrivateRoute
                exact
                path='/event/submitted'
                component={SubmittedEvent}
              />
              <PrivateRoute
                exact
                path='/event/attendeelist'
                component={AttendeeList}
              />

              <PrivateRoute
                exact
                path='/customer/restaurants'
                component={AllRest}
              />
              <PrivateRoute
                exact
                path='/restaurant/details/:res_id'
                component={Restaurant}
              />
              <PrivateRoute
                exact
                path='/customer/placeorder/:res_id'
                component={Placeorder}
              />
              <PrivateRoute
                exact
                path='/customer/restaurant/review/:res_id'
                component={AddReview}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
