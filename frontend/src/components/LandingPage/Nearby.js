import React, { useEffect, Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../layout/Spinner';
import styles from './Landing.module.css';
import { getQueryResults } from '../../actions/search';
import { getAllRestaurants } from '../../actions/restaurants';
import Geocode from 'react-geocode';

const Nearby = ({
  match,
  getQueryResults,
  search: { restaurantlist, loading },
  restaurant: { restaurants },
}) => {
  const data = match.params.filterData;

  useEffect(() => {
    getQueryResults(data);
  }, []);

  const displayRestaurants = () => {
    if (restaurantlist.length === 0) {
      return '';
    }
    const ids = restaurantlist.map((each) => each.restaurant_id);
    console.log('ID:', ids);
    return restaurants.map((res) => {
      if (ids.includes(res.restaurant_id)) {
        return (
          <Fragment>
            <div className='box'>
              <article className='media'>
                <div className='media-content'>
                  <div className='content'>
                    <p>
                      <strong>
                        <Link to={`/restaurant/details/${res.restaurant_id}`}>
                          {res.restaurant_name}
                        </Link>
                      </strong>
                      <br />
                    </p>
                    <p>
                      <i className='far fa-envelope-open'></i>{' '}
                      {res.restaurant_email_id}
                    </p>
                    <p>
                      <i className='fas fa-phone'></i> {res.restaurant_phone}
                    </p>
                    <p>
                      <i className='fas fa-map-marker-alt'></i>{' '}
                      {res.restaurant_location}
                    </p>
                    <p>
                      <i className='fas fa-clock'></i> {res.timings}
                    </p>
                    <p>{res.description}</p>
                  </div>
                </div>
              </article>
            </div>
          </Fragment>
        );
      }
    });
  };

  return loading ? (
    spinner
  ) : (
    <Fragment>
      <div className='container'>
        <h1 className={styles.form_title}>Search Nearby</h1>
        {displayRestaurants()}
        <hr />
        <br />
        <Link to='/' className={styles.top_btn}>
          Back to Search
        </Link>
      </div>
    </Fragment>
  );
};

Nearby.propTypes = {
  getQueryResults: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
  restaurant: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
  restaurant: state.restaurant,
});

export default connect(mapStateToProps, {
  getQueryResults,
})(Nearby);
