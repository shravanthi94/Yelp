import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Landing from './components/LandingPage/Landing';
import Login from './components/Customer/Login';
import Signup from './components/Customer/Signup';
import Profile from './components/Profile/Profile';
import CreateProfile from './components/profile-forms/CreateProfile';
import updateAbout from './components/profile-forms/EditAbout';
import updateContact from './components/profile-forms/EditContact';
import PrivateRoute from './components/routing/PrivateRoute';
import Alert from './components/layout/Alert';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  //  Component did mount
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
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
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
