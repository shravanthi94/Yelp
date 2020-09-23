import React from 'react';
import { Link } from 'react-router-dom';
import styles from './form.module.css';

const Signup = () => {
  return (
    <div className='container'>
      <div className={styles.form_flow}>
        <h2 className={styles.form_title}>Sign Up for Yelp</h2>
        <div className={styles.container}>
          <form
            action='/login'
            className={styles.yform}
            id='ajax-login'
            method='POST'
          >
            <label className={styles.placeholder_sub}>Name</label>
            <input
              className={styles.my_text}
              id='name'
              name='name'
              placeholder='Name'
              type='text'
              value=''
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
            <br />
            <p className={styles.legal_copy}>
              You also understand that Yelp may send marketing emails about
              Yelp’s products, services, and local events. You can unsubscribe
              at any time.
            </p>
            <button type='submit' value='submit' className={styles.btn}>
              Sign Up
            </button>
          </form>
        </div>

        <div>
          <small>
            Already on Yelp?{' '}
            <Link to='/login' className='signup-link'>
              Log in
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Signup;
