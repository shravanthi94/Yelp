import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import spinner from '../layout/Spinner';
import styles from './form.module.css';
import { getRestaurantReviews } from '../../actions/dashboard';
import Rating from 'react-rating';

const ViewReview = ({
  dashboard: { reviews, loading },
  getRestaurantReviews,
}) => {
  useEffect(() => {
    getRestaurantReviews();
  }, []);

  const displayReviews = () => {
    return reviews.map((review) => {
      return (
        <Fragment>
          <div className='box review'>
            <div className='rating'>
              <Rating
                emptySymbol='far fa-star'
                fullSymbol='fas fa-star'
                fractions={2}
                readonly
                initialRating={review.rating}
              />
              {'  '}
              <small>Review on {review.date.substring(0, 10)}</small>
            </div>
            <p className={styles.headers}>
              <strong>{review.comment}</strong>
            </p>
          </div>
        </Fragment>
      );
    });
  };
  return loading && reviews === null ? (
    spinner
  ) : (
    <Fragment>
      <div className='container profile-title'>
        <h1 className={styles.form_title}>Reviews given by customers</h1>
        {displayReviews()}
        <Link className={styles.btn} to='/restaurant/profile'>
          Back
        </Link>
      </div>
    </Fragment>
  );
};

ViewReview.propTypes = {
  getRestaurantReviews: PropTypes.func.isRequired,
  dashboard: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
});

export default connect(mapStateToProps, { getRestaurantReviews })(ViewReview);
