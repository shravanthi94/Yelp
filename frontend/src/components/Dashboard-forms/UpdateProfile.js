import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './form.module.css';
import {
  updateRestaurantProfile,
  getCurrentDashboard,
  uploadRestaurantImage,
} from '../../actions/dashboard';

const UpdateProfile = ({
  dashboard: { profile, loading },
  updateRestaurantProfile,
  history,
  getCurrentDashboard,
  uploadRestaurantImage,
}) => {
  const [formData, setformData] = useState({
    name: '',
    email: '',
    location: '',
    description: '',
    phone: '',
    timings: '',
    delivery: '',
    cuisine: '',
  });

  const [image, setimage] = useState({
    file: '',
    fileText: 'Choose image...',
  });

  useEffect(() => {
    getCurrentDashboard();

    setformData({
      name: loading || !profile.restaurant_name ? '' : profile.restaurant_name,
      email:
        loading || !profile.restaurant_email_id
          ? ''
          : profile.restaurant_email_id,
      location:
        loading || !profile.restaurant_location
          ? ''
          : profile.restaurant_location,
      description:
        loading || !profile.restaurant_description
          ? ''
          : profile.restaurant_description,
      phone:
        loading || !profile.restaurant_phone ? '' : profile.restaurant_phone,
      timings:
        loading || !profile.restaurant_timing ? '' : profile.restaurant_timing,
      delivery:
        loading || !profile.delivery_method ? '' : profile.delivery_method,
      cuisine: loading || !profile.cuisine ? '' : profile.cuisine,
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
    uploadRestaurantImage(formData);
  };

  const {
    name,
    email,
    location,
    description,
    timings,
    phone,
    delivery,
    cuisine,
  } = formData;

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updateRestaurantProfile(formData, history);
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
            <label className={styles.form_label}>Display picture</label>
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
            <label className={styles.form_label}>Restaurant Name</label>
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
            <label className={styles.form_label}>Restaurant Email</label>
            <br />
            <small className={styles.form_text}>This field is required.</small>
            <input
              className={styles.my_text}
              type='email'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Location</label>
            <br />
            <small className={styles.form_text}>San Jose, Bangalore</small>
            <input
              className={styles.my_text}
              type='text'
              name='location'
              value={location}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Description</label>
            <br />
            <small className={styles.form_text}>
              Tell us what you feel about our restaurant...
            </small>
            <textarea
              className={styles.my_headline}
              maxlength='1500'
              size='30'
              rows='6'
              type='text'
              name='description'
              value={description}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Timings</label>
            <br />
            <small className={styles.form_text}>8:00am-9:00pm</small>
            <input
              className={styles.my_text}
              type='text'
              name='timings'
              value={timings}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Restaurant Phone</label>
            <br />
            <small className={styles.form_text}>Give your contact number</small>
            <input
              className={styles.my_text}
              type='text'
              name='phone'
              value={phone}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Mode of Delivery</label>
            <br />
            <small className={styles.form_text}>
              Dine In, Curb Side Pick Up...
            </small>
            <input
              className={styles.my_text}
              type='text'
              name='delivery'
              value={delivery}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Select Cuisine</label>
            <br />
            <small className={styles.form_text}>
              Indian, Italian, Chinese...
            </small>
            <input
              className={styles.my_text}
              type='text'
              name='cuisine'
              value={cuisine}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <input type='submit' value='Save Changes' className={styles.btn} />
          <div className={styles.btn_grey}>
            <Link to='/restaurant/profile'>Cancel</Link>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

UpdateProfile.propTypes = {
  updateRestaurantProfile: PropTypes.func.isRequired,
  getCurrentDashboard: PropTypes.func.isRequired,
  uploadRestaurantImage: PropTypes.func.isRequired,
  dashboard: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
});

export default connect(mapStateToProps, {
  updateRestaurantProfile,
  getCurrentDashboard,
  uploadRestaurantImage,
})(withRouter(UpdateProfile));
