import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import spinner from '../layout/Spinner';
import styles from './Profile.module.css';
// import ProfileActions from './ProfileActions';

const Customer = ({
  getCurrentProfile,
  auth,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading && profile === null ? (
    spinner
  ) : (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.left}>
          <img src={profile.customer_image} alt='Profile_pic' />
          <h3 className={styles.title}>{profile.customer_name}'s Profile</h3>
          <h3 className={styles.subheading}>Contact information</h3>
          <h4 className={styles.title}>Email</h4>
          <p>{profile.customer_email_id}</p>
          <h4 className={styles.title}>Phone</h4>
          <p>{profile.customer_phone}</p>
        </div>
        <div className={styles.middle}>
          <div className={styles.middle_heading}>
            <h1 className={styles.name}>{profile.customer_name}</h1>
            <h3>
              <i class='fas fa-home'></i> {profile.city}, {profile.state},{' '}
              {profile.country}
            </h3>
          </div>
          <hr />
          <h2 className={styles.activity}>Recent Activity</h2>
        </div>
        <div className={styles.right}>
          <div className={styles.update_links}>
            <Link to='/update/basic' className={styles.btn_update}>
              <i class='fas fa-address-card'></i> Update Basics
            </Link>
            <Link to='/update/about' className={styles.btn_update}>
              <i class='fas fa-user'></i> Update About
            </Link>
            <Link to='/update/contact' className={styles.btn_update}>
              <i class='fas fa-phone-alt'></i> Update Contact
            </Link>
          </div>
          <div>
            <h3 className={styles.subheading}>About {profile.customer_name}</h3>
            <h4 className={styles.title}>Location</h4>
            <p>
              {profile.city}, {profile.state}, {profile.country}
            </p>
            <h4 className={styles.title}>Yelping Since</h4>
            <p>{profile.yelping_since}</p>
            <h4 className={styles.title}>Things I Love</h4>
            {!profile.things_i_love ? (
              <p>You haven't added anything yet</p>
            ) : (
              <p>{profile.things_i_love}</p>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Customer.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Customer);
