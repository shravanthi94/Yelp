import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../layout/Spinner';
import styles from './searchbar.module.css';
import { getAllRestaurants } from '../../actions/restaurants';

const AllRestaurants = ({
  getAllRestaurants,
  restaurant: { restaurants, loading },
}) => {
  useEffect(() => {
    getAllRestaurants();
  }, []);

  const displayRestaurants = () => {
    return restaurants.map((res) => {
      return (
        <Fragment>
          <div class='box' style={{ color: 'black' }}>
            <article class='media'>
              <div class='media-content'>
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
                        <i class='fas fa-check' style={{ color: 'green' }}></i>{' '}
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
    });
  };

  return loading ? (
    spinner
  ) : (
    <Fragment>
      <div className='container'>
        <h1 className={styles.form_title}>All Restaurants</h1>
        {displayRestaurants()}
      </div>
    </Fragment>
  );
};

AllRestaurants.propTypes = {
  getAllRestaurants: PropTypes.func.isRequired,
  restaurant: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  restaurant: state.restaurant,
});

export default connect(mapStateToProps, { getAllRestaurants })(AllRestaurants);
