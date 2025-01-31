import React, { useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../layout/Spinner';
import styles from './searchbar.module.css';
import Rating from 'react-rating';
import {
  getRestaurant,
  getMenuDetails,
  getCustReviewByRestId,
  getImages,
} from '../../actions/restaurants';

const Restaurant = ({
  match,
  getRestaurant,
  getMenuDetails,
  getCustReviewByRestId,
  getImages,
  restaurant: { restaurant, menu, review, images, loading },
}) => {
  const resId = match.params.res_id;

  useEffect(() => {
    getRestaurant(resId);
    getMenuDetails(resId);
    localStorage.usertype === 'customer' && getCustReviewByRestId(resId);
  }, []);

  useEffect(() => {
    if (restaurant) {
      getImages(restaurant.restaurant_id);
    }
  }, [restaurant]);

  console.log(images);
  let allImages = [],
    files,
    allFiles;
  const splitImages = () => {
    if (images) {
      allImages = images.map((img) => img.item_image);
    }
    files = allImages.join(',');
    allFiles = files.split(',');
  };
  splitImages();
  console.log(allFiles);

  const displayImages = () => {
    return allFiles.map((file) => {
      if (file !== '1') {
        return (
          <img
            className='dish_img2'
            src={`http://54.183.239.208:3001/images/dish/${file}`}
            alt='Dish_Image'
          />
        );
      }
    });
  };

  const {
    restaurant_id,
    restaurant_name,
    restaurant_email_id,
    restaurant_location,
    restaurant_phone,
    description,
    timings,
    delivery_method,
    cuisine,
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
                <br />
                {item.item_image === '1' || !item.item_image ? (
                  ''
                ) : (
                  <Link
                    className={styles.update_btn}
                    to={{
                      pathname: '/restaurant/item/images',
                      state: { images: item.item_image },
                    }}
                  >
                    View images
                  </Link>
                )}
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

  const displayReview = () => {
    return (
      <Fragment>
        <div className='box'>
          <div className='rating'>
            <Rating
              emptySymbol='far fa-star'
              fullSymbol='fas fa-star'
              fractions={2}
              readonly
              initialRating={review[0].rating}
            />
            {'  '}
            <small>Review on {review[0].date.substring(0, 10)}</small>
          </div>
          <p className={styles.headers}>
            <strong>{review[0].comment}</strong>
          </p>
        </div>
      </Fragment>
    );
  };

  let imgSrc;
  if (restaurant) {
    imgSrc = `http://54.183.239.208:3001/images/restaurant/${restaurant.restaurant_image}`;
  }

  return loading || !restaurant ? (
    spinner
  ) : (
    <Fragment>
      <div className='top-images'>{displayImages()}</div>
      <div className={styles.container1}>
        <div className='columns is-vcentered'>
          <div className='column is-10'>
            <div className='columns'>
              <div className='column is-6'>
                <h1 className={styles.name1}>{restaurant_name}</h1>
                <p className={styles.headers}>
                  <i class='fas fa-dollar-sign'></i>
                  <i class='fas fa-dollar-sign'></i> | {cuisine}
                </p>
                {/* <img
                  src={imgSrc}
                  alt='Restaurant_image'
                  width='300'
                  height='400'
                /> */}
                <br />
                <p className={styles.headers}>
                  <i class='fas fa-check' style={{ color: 'green' }}></i>{' '}
                  {delivery_method}
                </p>
                <p className={styles.headers}>
                  <i className='far fa-envelope-open'></i> {restaurant_email_id}
                </p>
                <p className={styles.headers}>
                  <i className='fas fa-phone'></i> {restaurant_phone}
                </p>
                <p className={styles.headers}>
                  <i className='fas fa-map-marker-alt'></i>{' '}
                  {restaurant_location}
                </p>
                <p className={styles.headers}>
                  <i className='fas fa-clock'></i> {timings}
                </p>
                <br />
                {localStorage.usertype === 'customer' ? (
                  <Fragment>
                    {' '}
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
                  </Fragment>
                ) : (
                  ''
                )}
              </div>
              {/* <div className='column is-6'>
                <div>
                  <h1 className={styles.maps}>Find us here...</h1>
                  <img
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${restaurant.restaurant_location}&zoom=13&size=400x400&maptype=roadmap&markers=${restaurant.restaurant_location}&key=AIzaSyCKDg7Z_A4RDYYz0Sv1qCWnXX28XyDONCk`}
                    alt='maps api'
                  />
                </div>
              </div> */}
            </div>
            <h1 className={styles.form_title}>Description</h1>
            <hr />
            <p className={styles.headers}>{description}</p>
            <hr />
            {localStorage.usertype === 'customer' ? (
              <Fragment>
                {' '}
                <h1 className={styles.form_title}>Your Review</h1>
                <hr />
                {review ? displayReview() : ''}
                <hr />
              </Fragment>
            ) : (
              ''
            )}
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
  getCustReviewByRestId: PropTypes.func.isRequired,
  getMenuDetails: PropTypes.func.isRequired,
  getImages: PropTypes.func.isRequired,
  restaurant: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  restaurant: state.restaurant,
});

export default connect(mapStateToProps, {
  getRestaurant,
  getMenuDetails,
  getCustReviewByRestId,
  getImages,
})(Restaurant);
