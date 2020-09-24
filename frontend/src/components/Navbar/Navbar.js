import React from 'react';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className={styles['top-nav']}>
      <div className={styles.left}>
        <Link to='/' className={styles.header_nav_link}>
          <img src={logo} className={styles.logo} alt='logo-img' />
        </Link>
        <Link to='!#' className={styles.header_nav_link}>
          Restaurants
        </Link>
        <Link to='!#' className={styles.header_nav_link}>
          Events
        </Link>
        <Link to='!#' className={styles.header_nav_link}>
          Orders
        </Link>
        <Link to='!#' className={styles.header_nav_link}>
          Profile
        </Link>
      </div>
      <div className={styles.right}>
        <Link to='/login' className={styles.header_nav_link}>
          Log In
        </Link>
        <Link to='/signup' className={styles.header_nav_button}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
