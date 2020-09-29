import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './createEvent.module.css';
import { createEvent, getAllEvents } from '../../actions/event';

const CreateEvent = ({
  event: { events, loading },
  createEvent,
  history,
  getAllEvents,
}) => {
  const [formData, setformData] = useState({
    name: '',
    description: '',
    time: '',
    date: '',
    location: '',
    hashtags: '',
  });

  //   useEffect(() => {
  //     getCurrentProfile();

  //     setformData({
  //       name: loading || !profile.customer_name ? '' : profile.customer_name,
  //       dateOfBirth:
  //         loading || !profile.date_of_birth ? '' : profile.date_of_birth,
  //       city: loading || !profile.city ? '' : profile.city,
  //       state: loading || !profile.state ? '' : profile.state,
  //       country: loading || !profile.country ? '' : profile.country,
  //       nickName: loading || !profile.nick_name ? '' : profile.nick_name,
  //       headline: loading || !profile.headline ? '' : profile.headline,
  //     });
  //   }, [loading]);

  const { name, description, time, date, location, hashtags } = formData;

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createEvent(formData, history);
  };

  return (
    <Fragment>
      <div className='container profile-title'>
        {' '}
        <h1 className={styles.form_title}>Create an Event</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Share exciting information about your
          event
        </p>
        <form className={styles.yform} onSubmit={(e) => onSubmit(e)}>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Event name</label>
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
            <label className={styles.form_label}>
              Description of your event
            </label>
            <br />
            <small className={styles.form_text}>
              Tell us about your event...
            </small>
            <input
              className={styles.my_text}
              type='text'
              name='description'
              value={description}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Date</label>
            <br />
            <small className={styles.form_text}>When is your event???</small>
            <input
              className={styles.my_text}
              type='text'
              name='date'
              value={date}
              onChange={(e) => onChange(e)}
              placeholder='yyyy-mm-dd'
              title='Please enter a valid date in requested format (YYYY-MM-DD)'
              required
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Time</label>
            <br />
            <small className={styles.form_text}>
              At what time is the event???
            </small>
            <input
              className={styles.my_text}
              type='text'
              name='time'
              value={time}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Location</label>
            <br />
            <small className={styles.form_text}>Tell us your venue...</small>
            <input
              className={styles.my_text}
              type='text'
              name='location'
              value={location}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Hashtags</label>
            <br />
            <small className={styles.form_text}>
              #music #cooking #food #fashion #arts
            </small>
            <input
              className={styles.my_text}
              type='text'
              name='hashtags'
              value={hashtags}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type='submit' value='Create Event' className={styles.btn} />
          <div className={styles.btn_grey}>
            <Link to='/event'>Cancel</Link>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

CreateEvent.propTypes = {
  createEvent: PropTypes.func.isRequired,
  getAllEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event,
});

export default connect(mapStateToProps, {
  createEvent,
  getAllEvents,
})(withRouter(CreateEvent));
