import React from 'react';
import logo from '../../assets/logo.png';
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <div className='container' className={styles.landing}>
      <img src={logo} className={styles.logo} alt='logo-img' />
    </div>
  );
};

export default Landing;
