import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <div className={styles.right}>
      <a href='#!' onClick={logout} className={styles.header_nav_link}>
        Logout
      </a>
    </div>
  );

  const guestLinks = (
    <div className={styles.right}>
      <Link to='/login' className={styles.header_nav_link}>
        Log In
      </Link>
      <Link to='/signup' className={styles.header_nav_button}>
        Sign Up
      </Link>
    </div>
  );
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
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
