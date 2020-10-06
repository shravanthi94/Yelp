import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './form.module.css';
import {
  createBasicsProfile,
  getCurrentProfile,
  uploadCustomerImage,
} from '../../actions/profile';

const CreateProfile = ({
  profile: { profile, loading },
  createBasicsProfile,
  history,
  getCurrentProfile,
  uploadCustomerImage,
}) => {
  const [formData, setformData] = useState({
    name: '',
    dateOfBirth: '',
    city: '',
    state: '',
    country: '',
    nickName: '',
    headline: '',
  });

  const [image, setimage] = useState({
    file: '',
    fileText: 'Choose image...',
  });

  useEffect(() => {
    getCurrentProfile();

    setformData({
      name: loading || !profile.customer_name ? '' : profile.customer_name,
      dateOfBirth:
        loading || !profile.date_of_birth ? '' : profile.date_of_birth,
      city: loading || !profile.city ? '' : profile.city,
      state: loading || !profile.state ? '' : profile.state,
      country: loading || !profile.country ? '' : profile.country,
      nickName: loading || !profile.nick_name ? '' : profile.nick_name,
      headline: loading || !profile.headline ? '' : profile.headline,
    });

    setimage({
      file: loading || !profile.customer_image ? '' : profile.customer_image,
      fileText: 'Choose new image...',
    });
  }, [loading]);

  const onImageChange = (e) => {
    setimage({
      file: e.target.files[0],
      fileText: e.target.files[0].name,
    });
  };

  const onUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image.file);
    uploadCustomerImage(formData);
  };

  const {
    name,
    dateOfBirth,
    city,
    state,
    country,
    nickName,
    headline,
  } = formData;

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createBasicsProfile(formData, history);
  };

  return (
    <Fragment>
      <div className='container profile-title'>
        {' '}
        <h1 className={styles.form_title}>Update Your Profile</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Let's get some information to make
          your profile stand out
        </p>
        <form onSubmit={(e) => onUpload(e)}>
          <br />
          <div className={styles.form_group}>
            <label className={styles.form_label}>Profile picture</label>
            <br /> <br />
            <input
              type='file'
              class='custom-file-input'
              name='image'
              accept='image/*'
              onChange={(e) => onImageChange(e)}
            />
            <label htmlFor='image'>{image.fileText}</label>
          </div>
          <button type='submit' className={styles.btn}>
            Upload
          </button>
        </form>
        <hr />
        <form className={styles.yform} onSubmit={(e) => onSubmit(e)}>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Full Name</label>
            <br />
            <small className={styles.form_text}>This field is required.</small>
            <input
              className={styles.my_text}
              type='text'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Your Date of Birth</label>
            <br />
            <small className={styles.form_text}>Your birthday</small>
            <input
              className={styles.my_text}
              type='text'
              placeholder='MM-DD-YYYY'
              name='dateOfBirth'
              value={dateOfBirth}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>City</label>
            <br />
            <small className={styles.form_text}>San Jose, Bangalore</small>
            <input
              className={styles.my_text}
              type='text'
              name='city'
              value={city}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>State</label>
            <br />
            <small className={styles.form_text}>California, Bangalore</small>
            <input
              className={styles.my_text}
              type='text'
              name='state'
              value={state}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Country</label>
            <br />
            <small className={styles.form_text}>United States, India</small>
            <input
              className={styles.my_text}
              type='text'
              name='country'
              value={country}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Nickname</label>
            <br />
            <small className={styles.form_text}>
              The Boss, Calamity Jane, The Prolific Reviewer
            </small>
            <input
              className={styles.my_text}
              type='text'
              name='nickName'
              value={nickName}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Your Headline</label>
            <br />
            <small className={styles.form_text}>
              Taco Tuesday Aficionado, The Globetrotting Reviewer
            </small>
            <input
              className={styles.my_headline}
              type='text'
              name='headline'
              value={headline}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type='submit' value='Save Changes' className={styles.btn} />
          <div className={styles.btn_grey}>
            <Link to='/profile'>Cancel</Link>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createBasicsProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  uploadCustomerImage: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  createBasicsProfile,
  getCurrentProfile,
  uploadCustomerImage,
})(withRouter(CreateProfile));
