import React, { useEffect, Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../layout/Spinner';
import styles from './Landing.module.css';

const Filters = ({
  match,
  search: { restaurantlist, loading },
  restaurant: { restaurants },
  location,
}) => {
  const data = match.params.filterData;
  const backData = location.state.query;

  const displayRestaurants = () => {
    if (restaurantlist.length === 0) {
      return '';
    }
    const ids = restaurantlist.map((each) => each.restaurant_id);

    return restaurants.map((res) => {
      if (ids.includes(res.restaurant_id) && res.delivery_method == data) {
        return (
          <Fragment>
            <div className='box' style={{ color: 'black' }}>
              <article className='media'>
                <div className='media-content'>
                  <div class='content'>
                    <div className='columns'>
                      <div className='column is-4'>
                        <img
                          className={styles.img}
                          src={`http://localhost:3001/images/restaurant/${res.restaurant_image}`}
                          alt='Restaurant_image'
                        />
                      </div>
                      <div className='column is-8'>
                        <p>
                          <strong>
                            <Link
                              className={styles.rest_name}
                              to={`/restaurant/details/${res.restaurant_id}`}
                            >
                              {res.restaurant_name}
                            </Link>
                          </strong>
                          <br />
                        </p>
                        <p>
                          <i
                            class='fas fa-check'
                            style={{ color: 'green' }}
                          ></i>{' '}
                          {res.delivery_method}
                        </p>
                        <p>
                          <i class='far fa-envelope-open'></i>{' '}
                          {res.restaurant_email_id}
                        </p>
                        <p>
                          <i class='fas fa-phone'></i> {res.restaurant_phone}
                        </p>
                        <p>
                          <i class='fas fa-map-marker-alt'></i>{' '}
                          {res.restaurant_location}
                        </p>
                        <p>
                          <i class='fas fa-clock'></i> {res.timings}
                        </p>
                        <p>{res.description}</p>
                      </div>
                    </div>
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
        <h1 className={styles.form_title}>Search Results</h1>
        {displayRestaurants()}
        <hr />
        <br />
        <Link to={`/search/restaurants/${backData}`} className={styles.top_btn}>
          Back
        </Link>
      </div>
    </Fragment>
  );
};

Filters.propTypes = {
  search: PropTypes.object.isRequired,
  restaurant: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
  restaurant: state.restaurant,
});

export default connect(mapStateToProps)(Filters);
