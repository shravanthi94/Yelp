import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Profile.module.css';

const ProfileActions = () => {
  return (
    <div className={styles.btn_update}>
      <Link to='/update/basic' className={styles.btn_update}>
        <i class='fas fa-user-circle text-primary'></i> Edit Profile
      </Link>
      <Link to='/update/about' className={styles.btn_update}>
        <i class='fab fa-black-tie text-primary'></i> Add About
      </Link>
    </div>
  );
};

export default ProfileActions;
