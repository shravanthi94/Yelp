import React, { useEffect, useState, Fragment } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../layout/Spinner';
import styles from './Event.module.css';
import {
  getAllEvents,
  registerEvent,
  getRegisteredEvents,
} from '../../actions/event';

const Event = ({
  getAllEvents,
  event: { events, registered, loading },
  auth: { restaurant, isAuthenticated },
  getRegisteredEvents,
  history,
  registerEvent,
}) => {
  useEffect(() => {
    getAllEvents();
    getRegisteredEvents();
  }, []);

  const [eventSearch, seteventSearch] = useState('');

  // if (!isAuthenticated) {
  //   return <Redirect to='/login' />;
  // }

  const register = (e, eventId) => {
    e.preventDefault();
    registerEvent(eventId, history);
  };

  const listAllEvents = (list, button) => {
    return list.map((event) => {
      return (
        <div className={styles.event_card}>
          <Link
            to={`/event/details/${event.event_name}`}
            className={styles.title}
          >
            {event.event_name}
          </Link>
          <br /> <br />
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
        </div>
      );
    });
  };

  let miniList = [];

  if (registered.length > 3) {
    miniList = registered.splice(0, 3);
  }
  console.log(miniList);

  return loading ? (
    spinner
  ) : (
    <Fragment>
      <div className={styles.container}>
        <h1 className={styles.heading}>Official Yelp Events</h1>
        <div>
          <input
            className='field request search_bar'
            type='text'
            placeholder='Search by Event Name'
            name='eventSearch'
            value={eventSearch}
            onChange={(e) => seteventSearch(e.target.value)}
          />
          <Link
            to={`/event/details/${eventSearch}`}
            className={styles.btn_update}
          >
            Search
          </Link>
        </div>
        <div className={styles.left}>
          <h1 className={styles.heading}>Your Registered Events</h1>
          {miniList.length > 0 ? (
            <Fragment>
              {listAllEvents(miniList, false)}{' '}
              <Link to='/event/registered' className={styles.view_all}>
                View all
              </Link>
              <br />
              <br />
              <br /> <hr />
            </Fragment>
          ) : (
            listAllEvents(registered, false)
          )}
          <h1 className={styles.heading}>Popular Events</h1>
          {listAllEvents(events, true)}
        </div>
        <div className={styles.right}>
          <div className={styles.update_links}>
            {restaurant && (
              <Fragment>
                <Link to='/event/create' className={styles.btn_update}>
                  Create Event
                </Link>{' '}
                <Link to='/event/submitted' className={styles.btn_update}>
                  Events Submitted
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
  getRegisteredEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getAllEvents,
  registerEvent,
  getRegisteredEvents,
})(withRouter(Event));
