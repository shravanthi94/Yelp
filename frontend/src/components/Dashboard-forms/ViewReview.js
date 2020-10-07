import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import spinner from '../layout/Spinner';
import styles from './form.module.css';
import { getRestaurantReviews } from '../../actions/dashboard';

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
          <tr>
            <td>{review.cust_name}</td>
            <td>{review.comment}</td>
            <td>{review.rating}</td>
            <td>{review.date.substring(0, 10)}</td>
          </tr>
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
        <table>
          <tr>
            <th>Customer Name</th>
            <th>Review</th>
            <th>Rating</th>
            <th>Date</th>
          </tr>
          {displayReviews()}
        </table>
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
