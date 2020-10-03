import React, { useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../layout/Spinner';
import styles from './Event.module.css';
import { getEventByName } from '../../actions/event';

const EventDetails = ({ match, getEventByName, event: { event, loading } }) => {
  const eventName = match.params.event_name;

  useEffect(() => {
    getEventByName(eventName);
  }, []);

  event = event[0];

  return loading || !event ? (
    spinner
  ) : (
    <Fragment>
      <div className={styles.container}>
        <h1 className={styles.heading}>Event Details</h1>
        <hr />
        <br />
        <h1 className='title is-1'>{event.event_name}</h1>
        <hr />
        <br />
        <h3 className='title is-4'>Event Date</h3>
        <p>{event.event_date && event.event_date.substring(0, 10)}</p>
        <br />
        <br />
        <h3 className='title is-4'>Event Time</h3>
        <p>{event.event_time}</p>
        <br />
        <br />
        <h3 className='title is-4'>Venue</h3>
        <p>{event.event_location}</p>
        <br />
        <br />
        <h3 className='title is-4'>Description</h3>
        <p>{event.event_description}</p>
        <br />
        <br />
        <h3 className='title is-4'>#Hashtags</h3>
        <p>{event.event_hashtags}</p>
      </div>
      <Link to='/event' className={styles.btn_update}>
        Back to Events
      </Link>
    </Fragment>
  );
};

EventDetails.propTypes = {
  getEventByName: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event,
});

export default connect(mapStateToProps, { getEventByName })(EventDetails);
