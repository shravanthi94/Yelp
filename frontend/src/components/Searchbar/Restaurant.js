import React, { useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../layout/Spinner';
import styles from './searchbar.module.css';
import { getRestaurant } from '../../actions/restaurants';

const Restaurant = ({
  match,
  getRestaurant,
  restaurant: { restaurant, loading },
}) => {
  const resId = match.params.res_id;

  useEffect(() => {
    getRestaurant(resId);
  }, []);

  const {
    restaurant_id,
    restaurant_name,
    restaurant_email_id,
    restaurant_location,
    restaurant_phone,
    description,
    timings,
  } = restaurant;

  return loading || !restaurant ? (
    spinner
  ) : (
    <Fragment>
      <div className={styles.container}>
        <div class='columns is-vcentered'>
          <div class='column is-8'>
            <h1 className={styles.name}>{restaurant_name}</h1>
            <p className={styles.headers}>
              <i class='far fa-envelope-open'></i> {restaurant_email_id}
            </p>
            <p className={styles.headers}>
              <i class='fas fa-phone'></i> {restaurant_phone}
            </p>
            <p className={styles.headers}>
              <i class='fas fa-map-marker-alt'></i> {restaurant_location}
            </p>
            <p className={styles.headers}>
              <i class='fas fa-clock'></i> {timings}
            </p>
            <br />
            <Link
              to={`/customer/restaurant/review/${restaurant_id}`}
              className={styles.top_btn}
            >
              Write a Review
            </Link>
            <Link
              to={`/customer/placeorder/${restaurant_id}`}
              className={styles.top_btn}
            >
              Order Now
            </Link>
            <h1 className={styles.form_title}>Description</h1>
            <hr />
            <p className={styles.headers}>{description}</p>
            <br />
            <hr />
            <Link to='/customer/restaurants' className={styles.top_btn}>
              Back to Restaurants
            </Link>
            <br /> <br />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Restaurant.propTypes = {
  getRestaurant: PropTypes.func.isRequired,
  restaurant: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  restaurant: state.restaurant,
});

export default connect(mapStateToProps, { getRestaurant })(Restaurant);
