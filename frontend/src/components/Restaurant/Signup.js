import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styles from './form.module.css';
import { signupRestaurant } from '../../actions/auth';
import PropTypes from 'prop-types';

const Signup = ({ signupRestaurant, isAuthenticated }) => {
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
  });

  const { name, email, password, location } = formData;

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    signupRestaurant({ name, email, password, location });
  };

  if (isAuthenticated) {
    return <Redirect to='/restaurant/profile' />;
  }

  return (
    <div className='container'>
      <div className={styles.form_flow}>
        <h2 className={styles.form_title}>Sign Up for Yelp</h2>
        <div className={styles.container}>
          <form className={styles.yform} onSubmit={(e) => onSubmit(e)}>
            <label className={styles.placeholder_sub}>Name</label>
            <input
              className={styles.my_text}
              id='name'
              name='name'
              placeholder='Name'
              type='text'
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
            <br />
            <label className={styles.placeholder_sub}>Email</label>
            <input
              className={styles.my_text}
              id='email'
              name='email'
              placeholder='Email'
              type='email'
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
            <br />
            <label className={styles.placeholder_sub}>Password</label>
            <input
              className={styles.my_text}
              id='password'
              name='password'
              placeholder='Password'
              type='password'
              value={password}
              onChange={(e) => onChange(e)}
              required
              minLength='4'
            />
            <br />
            <label className={styles.placeholder_sub}>Location</label>
            <input
              className={styles.my_text}
              id='location'
              name='location'
              placeholder='Location'
              type='text'
              value={location}
              onChange={(e) => onChange(e)}
              required
            />
            <br />
            <p className={styles.legal_copy}>
              You also understand that Yelp may send marketing emails about
              Yelp’s products, services, and local events. You can unsubscribe
              at any time.
            </p>
            <button type='submit' value='Signup' className={styles.btn}>
              Sign Up
            </button>
          </form>
        </div>

        <div>
          <small>
            Already on Yelp?{' '}
            <Link to='/restaurant/login' className='signup-link'>
              Log in
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signupRestaurant })(Signup);
