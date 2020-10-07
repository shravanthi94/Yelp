import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCustomerDetails } from '../../actions/customer';
import spinner from '../layout/Spinner';
import styles from './Display.module.css';

const Customer = ({
  getCustomerDetails,
  customer: { customer, loading },
  match,
}) => {
  const id = match.params.customerId;

  useEffect(() => {
    getCustomerDetails(id);
  }, []);

  let imgSrc;
  if (customer) {
    imgSrc = `http://localhost:3001/images/customer/${customer.customer_image}`;
  }

  return loading && customer === null ? (
    spinner
  ) : (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.left}>
          <img src={imgSrc} alt='Profile_pic' />
          <h3 className={styles.title}>{customer.customer_name}'s Profile</h3>
          <h3 className={styles.subheading}>Contact information</h3>
          <h4 className={styles.title}>Email</h4>
          <p>{customer.customer_email_id}</p>
          <h4 className={styles.title}>Phone</h4>
          <p>{customer.customer_phone}</p>
        </div>
        <div className={styles.middle}>
          <div className={styles.middle_heading}>
            <h1 className={styles.name}>{customer.customer_name}</h1>
            <h3>
              <i class='fas fa-home'></i> {customer.city}, {customer.state},{' '}
              {customer.country}
            </h3>
          </div>
          <hr />
          <h2 className={styles.activity}>Headline</h2>
          {!customer.headline ? (
            ''
          ) : (
            <Fragment>
              <h4 className={styles.headline}>{customer.headline}</h4>
            </Fragment>
          )}

          {!customer.date_of_birth ? (
            ''
          ) : (
            <Fragment>
              <h2 className={styles.activity}>Don't forget to wish me on</h2>
              <h4 className={styles.title}>
                <i class='fas fa-birthday-cake'></i> {customer.date_of_birth}
              </h4>
            </Fragment>
          )}
        </div>
        <div className={styles.right}>
          <div>
            <h3 className={styles.subheading}>
              About {customer.customer_name}
            </h3>
            <h4 className={styles.title}>Location</h4>
            <p>
              <i class='fas fa-home'></i> {customer.city}, {customer.state},{' '}
              {customer.country}
            </p>
            <h4 className={styles.title}>Yelping Since</h4>
            <p>
              <i class='fas fa-calendar-day'></i> {customer.yelping_since}
            </p>
            <h4 className={styles.title}>Things I Love</h4>
            {!customer.things_i_love ? (
              <p>You haven't told us yet ... do tell!</p>
            ) : (
              <p>
                <i class='fas fa-heart'></i> {customer.things_i_love}
              </p>
            )}

            {!customer.find_me_in ? (
              ''
            ) : (
              <Fragment>
                <h4 className={styles.title}>Find me in</h4>
                <p>
                  <i class='fas fa-plane-departure'></i> {customer.hometown}
                </p>
              </Fragment>
            )}
            {!customer.my_blog ? (
              ''
            ) : (
              <Fragment>
                <h4 className={styles.title}>My Blog</h4>
                <p>
                  <i class='fas fa-blog'></i> {customer.my_blog}
                </p>
              </Fragment>
            )}
            {!customer.when_not_yelping ? (
              ''
            ) : (
              <Fragment>
                <h4 className={styles.title}>When not yelping</h4>
                <p>
                  <i class='fas fa-hourglass-half'></i>{' '}
                  {customer.when_not_yelping}
                </p>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Customer.propTypes = {
  getCustomerDetails: PropTypes.func.isRequired,
  customer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  customer: state.customer,
});

export default connect(mapStateToProps, { getCustomerDetails })(Customer);
