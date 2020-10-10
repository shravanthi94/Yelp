import React, { useEffect, Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../layout/Spinner';
import styles from './Landing.module.css';

const Nearby = ({
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
    console.log('Nearby filtered ids:', ids);

    return restaurants.map((res) => {
      if (
        ids.includes(res.restaurant_id) &&
        res.restaurant_location.includes(data)
      ) {
        return (
          <Fragment>
            <div className='box border' style={{ color: 'black' }}>
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

  let mapsInput = '';
  console.log(mapsInput);
  const displayMaps = () => {
    if (restaurantlist.length === 0) {
      return '';
    }
    const ids = restaurantlist.map((each) => each.restaurant_id);

    restaurants.forEach((res) => {
      if (
        ids.includes(res.restaurant_id) &&
        res.restaurant_location.includes(data)
      ) {
        mapsInput = mapsInput + '|' + res.restaurant_location;
      }
    });
    return (
      <img
        className='main-map'
        src={`https://maps.googleapis.com/maps/api/staticmap?&size=512x512&maptype=roadmap\&markers=size:mid%7Ccolor:red%20${mapsInput}&key=AIzaSyCKDg7Z_A4RDYYz0Sv1qCWnXX28XyDONCk`}
        alt='maps-locations'
      ></img>
    );
  };

  return loading ? (
    spinner
  ) : (
    <Fragment>
      <div className='columns'>
        <div
          className='column is-7'
          style={{ padding: '2%', marginLeft: '2%' }}
        >
          {' '}
          <h1 className={styles.form_title1}>Search Results</h1>
          {displayRestaurants()}
        </div>
        <div className='column is-5'>{displayMaps()}</div>
      </div>
      <br />
      <Link
        to={`/search/restaurants/${backData}`}
        className={styles.back_btn}
        style={{ marginLeft: '6%', marginBottom: '2%' }}
      >
        Back to Search
      </Link>
    </Fragment>
  );
};

Nearby.propTypes = {
  search: PropTypes.object.isRequired,
  restaurant: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
  restaurant: state.restaurant,
});

export default connect(mapStateToProps)(Nearby);
