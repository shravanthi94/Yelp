import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Landing from './components/LandingPage/Landing';

import Login from './components/Customer/Login';
import Signup from './components/Customer/Signup';

import ResLogin from './components/Restaurant/Login';
import ResSignup from './components/Restaurant/Signup';

import Profile from './components/Profile/Profile';
import CreateProfile from './components/profile-forms/CreateProfile';
import updateAbout from './components/profile-forms/EditAbout';
import updateContact from './components/profile-forms/EditContact';

import Dashboard from './components/Dashboard/Dashboard';
import RestaurantUpdateProfile from './components/Dashboard-forms/UpdateProfile';
import AddDish from './components/Dashboard-forms/AddDish';
import UpdateDish from './components/Dashboard-forms/UpdateItem';
import ViewReview from './components/Dashboard-forms/ViewReview';

import Event from './components/events/Event';
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
    store.dispatch(loadUser());
    store.dispatch(loadRestaurant());
  });
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
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

              <Route exact path='/event' component={Event} />
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
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
