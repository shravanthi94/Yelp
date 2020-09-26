import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import spinner from '../layout/Spinner';
import styles from './Profile.module.css';
// import ProfileActions from './ProfileActions';

const Profile = ({
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
        <img src={profile.customer_image} alt='Profile_pic' />
        <h3 className={styles.title}>{profile.customer_name}'s Profile</h3>

        {/* {profile !== null ? (
        <Fragment>HAS</Fragment>
      ) : (
        <Fragment>HAS NOT</Fragment>
      )} */}
        <Fragment>
          <Link to='/update/basic' className={styles.btn_update}>
            Update Basics
          </Link>
          <Link to='/update/about' className={styles.btn_update}>
            Update About
          </Link>
          <Link to='/update/contact' className={styles.btn_update}>
            Update Contact
          </Link>
        </Fragment>
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
