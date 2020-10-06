import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../layout/Spinner';
import styles from './Event.module.css';
import { attendeeList } from '../../actions/event';

const AttendeeList = ({
  event: { customers, loading },
  attendeeList,
  location,
}) => {
  console.log(location);
  useEffect(() => {
    attendeeList(location.state.eventId);
  }, []);
  const listCustomers = () => {
    return customers.map((customer) => {
      return (
        <div className={styles.event_card}>
          <h1 className={styles.title}>
            <Link
              className={styles.cust_name}
              to={`/customer/details/${customer.customer_id}`}
            >
              {customer.customer_name}
            </Link>
          </h1>
          <p>
            <i class='fas fa-envelope'></i> {customer.customer_email_id}
          </p>
          <p>
            <i class='fas fa-phone'></i> {customer.customer_phone}
          </p>
          <p>
            <i class='fas fa-map-marker-alt'></i> {customer.city},{' '}
            {customer.state}
          </p>
        </div>
      );
    });
  };
  return loading ? (
    spinner
  ) : (
    <Fragment>
      <div className={styles.container}>
        <h1 className={styles.heading}>Attendee List</h1>
        <div className={styles.left}>{listCustomers()}</div>
      </div>
      <Link to='/event/submitted' className={styles.btn}>
        Go Back
      </Link>
    </Fragment>
  );
};

AttendeeList.propTypes = {
  attendeeList: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event,
});
export default connect(mapStateToProps, { attendeeList })(AttendeeList);
