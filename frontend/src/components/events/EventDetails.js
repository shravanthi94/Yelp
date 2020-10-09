import React, { useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../layout/Spinner';
import styles from './Event.module.css';
import { getEventByName, registerEvent } from '../../actions/event';

const EventDetails = ({
  match,
  getEventByName,
  registerEvent,
  event: { event, loading },
  history,
}) => {
  const eventName = match.params.event_name;

  useEffect(() => {
    getEventByName(eventName);
  }, []);

  event = event[0];

  const register = (e, eventId) => {
    e.preventDefault();
    registerEvent(eventId, history);
  };

  return loading || !event ? (
    spinner
  ) : (
    <Fragment>
      <div className={styles.container}>
        <div className='columns'>
          <div className='column is-8'>
            <h1 className='title is-1'>{event.event_name}</h1>
            <p>
              {' '}
              <i class='fas fa-calendar-check'></i>{' '}
              {event.event_date && event.event_date.substring(0, 10)}{' '}
            </p>
            <p>
              {' '}
              <i class='fas fa-clock'></i> {event.event_time}{' '}
            </p>
            <p>
              {' '}
              <i class='fas fa-map-marker-alt'></i> {event.event_location}{' '}
            </p>
            <hr />
            <h3 className='event-red'>What/Why</h3>
            <p>{event.event_description}</p>
            <br />
            <h3 className='event-red'>#hashtags</h3>
            <p>{event.event_hashtags}</p>
            <br />
          </div>
          <div className='column is-4'>
            <p className='event-red'>Are you interested?</p>{' '}
            {localStorage.usertype === 'customer' ? (
              <button
                type='submit'
                className={styles.btn}
                onClick={(e) => register(e, event.event_id)}
              >
                RSVP
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <Link to='/event' className={styles.btn} style={{ margin: 30 }}>
        Back to Events
      </Link>
    </Fragment>
  );
};

EventDetails.propTypes = {
  getEventByName: PropTypes.func.isRequired,
  registerEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event,
});

export default connect(mapStateToProps, { getEventByName, registerEvent })(
  withRouter(EventDetails),
);
