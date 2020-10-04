import React from 'react';
import { Link } from 'react-router-dom';
import search from '../../assets/search.png';
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <div className={styles.landing}>
      <div class='main-logo'>
        <a href='javascript:void(0);'>
          <img
            src='https://s3-media4.fl.yelpcdn.com/assets/srv0/yelp_styleguide/c3484759c57a/assets/img/logos/logo_desktop_xlarge.png'
            alt='yelp logo'
            width='160px'
            height='80px'
          />
        </a>
      </div>
      <input
        type='text'
        placeholder="tacos, cheap dinner, Max's"
        class='field request'
      />
      {/* <i class='fas fa-search'></i> */}
      <Link to='javascript.void(0);' class='search-button'>
        <i class='fas fa-search'></i>
      </Link>
    </div>
  );
};

export default Landing;
