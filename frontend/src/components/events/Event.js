import React, { useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../layout/Spinner';
import styles from './Event.module.css';
import { getAllEvents, registerEvent } from '../../actions/event';

const Event = ({
  getAllEvents,
  event: { events, loading },
  auth: { restaurant, isAuthenticated },
  history,
  registerEvent,
}) => {
  useEffect(() => {
    getAllEvents();
  }, []);

  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }

  const register = (e, eventId) => {
    e.preventDefault();
    registerEvent(eventId, history);
  };

  const listAllEvents = () => {
    return events.map((event) => {
      return (
        <div className={styles.event_card}>
          <h1 className={styles.title}>{event.event_name}</h1>
          <p>
            <i class='fas fa-calendar-day'></i>{' '}
            {event.event_date && event.event_date.substring(0, 10)},{' '}
            {event.event_time}
          </p>
          <p>
            <i class='fas fa-map-marker-alt'></i> {event.event_location}
          </p>
          <p className={styles.event_description}>{event.event_description}</p>
          <p className={styles.event_hashtags}>{event.event_hashtags}</p>
          {!restaurant ? (
            <button
              type='submit'
              className={styles.event_register}
              onClick={(e) => register(e, event.event_id)}
            >
              Register
            </button>
          ) : (
            ''
          )}
          <br />
          <Link to={`/event/details/${event.event_name}`}>Show details</Link>
        </div>
      );
    });
  };

  return loading ? (
    spinner
  ) : (
    <Fragment>
      <div className={styles.container}>
        <h1 className={styles.heading}>Official Yelp Events</h1>
        <div className={styles.left}>{listAllEvents()}</div>
        <div className={styles.right}>
          <div className={styles.update_links}>
            {restaurant ? (
              <Fragment>
                <h2 className={styles.title_right}>Your Schedule</h2>
                <Link to='/event/create' className={styles.btn_update}>
                  Create Event
                </Link>{' '}
                <Link to='/event/submitted' className={styles.btn_update}>
                  Events Submitted
                </Link>
              </Fragment>
            ) : (
              <Fragment>
                <h2 className={styles.title_right}>Your Schedule</h2>
                <Link to='/event/registered' className={styles.btn_update}>
                  Events Attending
                </Link>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Event.propTypes = {
  getAllEvents: PropTypes.func.isRequired,
  registerEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event,
  auth: state.auth,
});
export default connect(mapStateToProps, { getAllEvents, registerEvent })(Event);
