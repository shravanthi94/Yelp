import React from 'react';
import { Link } from 'react-router-dom';
import styles from './form.module.css';

const Login = () => {
  return (
    <div className='container'>
      <div className={styles.form_flow}>
        <h2 className={styles.form_title}>Log in to Yelp</h2>
        <div className={styles.container}>
          <form
            action='/login'
            className={styles.yform}
            id='ajax-login'
            method='POST'
          >
            <label className={styles.placeholder_sub}>Email</label>
            <input
              className={styles.my_text}
              id='email'
              name='email'
              placeholder='Email'
              type='email'
              value=''
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
              value=''
              required
            />
            <button type='submit' value='submit' className={styles.btn}>
              Log In
            </button>
          </form>
        </div>
        <div>
          <small>
            New to Yelp?{' '}
            <Link to='/signup' className='signup-link'>
              Sign up
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
