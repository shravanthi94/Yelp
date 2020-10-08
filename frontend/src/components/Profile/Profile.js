import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import spinner from '../layout/Spinner';
import styles from './Profile.module.css';

const Profile = ({ getCurrentProfile, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  let imgSrc;
  if (profile) {
    imgSrc = `http://localhost:3001/images/customer/${profile.customer_image}`;
  }

  return loading && profile === null ? (
    spinner
  ) : (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.left}>
          <img src={imgSrc} alt='Profile_pic' />
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
            {!profile.nick_name ? (
              ''
            ) : (
              <Fragment>
                <h3>
                  <i class='fas fa-chess-pawn'></i>
                  {'   '} Call me *{profile.nick_name}*
                </h3>
              </Fragment>
            )}
          </div>
          <hr />
          <h2 className={styles.activity}>Headline</h2>
          {!profile.headline ? (
            <p>Add your headline...</p>
          ) : (
            <Fragment>
              <h4 className={styles.headline}>{profile.headline}</h4>
            </Fragment>
          )}

          {!profile.date_of_birth ? (
            ''
          ) : (
            <Fragment>
              <h2 className={styles.activity}>Don't forget to wish me on</h2>
              <h4 className={styles.title}>
                <i class='fas fa-birthday-cake'></i> {profile.date_of_birth}
              </h4>
            </Fragment>
          )}
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
              <i class='fas fa-home'></i> {profile.city}, {profile.state},{' '}
              {profile.country}
            </p>
            <h4 className={styles.title}>Yelping Since</h4>
            <p>
              <i class='fas fa-calendar-day'></i> {profile.yelping_since}
            </p>
            <h4 className={styles.title}>Things I Love</h4>
            {!profile.things_i_love ? (
              <p>You haven't told us yet ... do tell!</p>
            ) : (
              <p>
                <i class='fas fa-heart'></i> {profile.things_i_love}
              </p>
            )}

            {!profile.find_me_in ? (
              ''
            ) : (
              <Fragment>
                <h4 className={styles.title}>Find me in</h4>
                <p>
                  <i class='fas fa-plane-departure'></i> {profile.find_me_in}
                </p>
              </Fragment>
            )}
            {!profile.my_blog ? (
              ''
            ) : (
              <Fragment>
                <h4 className={styles.title}>My Blog</h4>
                <p>
                  <i class='fas fa-blog'></i> {profile.my_blog}
                </p>
              </Fragment>
            )}
            {!profile.when_not_yelping ? (
              ''
            ) : (
              <Fragment>
                <h4 className={styles.title}>When not yelping</h4>
                <p>
                  <i class='fas fa-hourglass-half'></i>{' '}
                  {profile.when_not_yelping}
                </p>
              </Fragment>
            )}
          </div>
        </div>
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
