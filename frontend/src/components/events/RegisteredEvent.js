import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../layout/Spinner';
import styles from './Event.module.css';
import { getRegisteredEvents } from '../../actions/event';

const RegisteredEvent = ({
  getRegisteredEvents,
  event: { registered, loading },
}) => {
  useEffect(() => {
    getRegisteredEvents();
  }, []);

  const listRegisteredEvents = () => {
    return registered.map((event) => {
      return (
        <div className={styles.event_card}>
          <h1 className={styles.title}>{event.event_name}</h1>
          <p>
            <i class='fas fa-calendar-day'></i>{' '}
            {event.event_date.substring(0, 10)}, {event.event_time}
          </p>
          <p>
            <i class='fas fa-map-marker-alt'></i> {event.event_location}
          </p>
          <p className={styles.event_description}>{event.event_description}</p>
          <p className={styles.event_hashtags}>{event.event_hashtags}</p>
        </div>
      );
    });
  };
  return loading ? (
    spinner
  ) : (
    <Fragment>
      <div className={styles.container}>
        <h1 className={styles.heading}>Your Registered Events</h1>
        <div className={styles.left}>{listRegisteredEvents()}</div>
      </div>
    </Fragment>
  );
};

RegisteredEvent.propTypes = {
  getRegisteredEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event,
});
export default connect(mapStateToProps, { getRegisteredEvents })(
  RegisteredEvent,
);
