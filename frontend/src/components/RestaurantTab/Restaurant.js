import React, { useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../layout/Spinner';
import styles from './searchbar.module.css';
import { getRestaurant, getMenuDetails } from '../../actions/restaurants';

const Restaurant = ({
  match,
  getRestaurant,
  getMenuDetails,
  restaurant: { restaurant, menu, loading },
}) => {
  const resId = match.params.res_id;

  useEffect(() => {
    getRestaurant(resId);
    getMenuDetails(resId);
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

  const displayMenuItems = () => {
    return menu.map((item) => {
      return (
        <Fragment>
          <tr>
            <td>
              <div>
                {item.item_name} <br />
                {item.item_description}
              </div>
            </td>
            <td>{item.item_ingredients}</td>
            <td>{item.item_category}</td>
            <td>$ {item.item_price}</td>
          </tr>
        </Fragment>
      );
    });
  };

  return loading || !restaurant ? (
    spinner
  ) : (
    <Fragment>
      <div className={styles.container}>
        <div className='columns is-vcentered'>
          <div className='column is-8'>
            <h1 className={styles.name}>{restaurant_name}</h1>
            <p className={styles.headers}>
              <i className='far fa-envelope-open'></i> {restaurant_email_id}
            </p>
            <p className={styles.headers}>
              <i className='fas fa-phone'></i> {restaurant_phone}
            </p>
            <p className={styles.headers}>
              <i className='fas fa-map-marker-alt'></i> {restaurant_location}
            </p>
            <p className={styles.headers}>
              <i className='fas fa-clock'></i> {timings}
            </p>
            <br />
            <Link
              to={`/customer/restaurant/review/${restaurant_id}`}
              className={styles.top_btn}
            >
              🌟 Write a Review
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
            <hr />
            <h1 className={styles.form_title}>Menu</h1>
            <hr />
            {menu ? (
              <table>
                <tr>
                  <th>Dish Name</th>
                  <th>Ingredients</th>
                  <th>Item Category</th>
                  <th>Price</th>
                </tr>
                {displayMenuItems()}
              </table>
            ) : (
              ''
            )}
            {/* <table>
              <tr>
                <th>Dish Name</th>
                <th>Ingredients</th>
                <th>Item Category</th>
                <th>Price</th>
              </tr>
              {displayMenuItems()}
            </table> */}
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
  getMenuDetails: PropTypes.func.isRequired,
  restaurant: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  restaurant: state.restaurant,
});

export default connect(mapStateToProps, { getRestaurant, getMenuDetails })(
  Restaurant,
);
