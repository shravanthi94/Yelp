import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrentDashboard,
  getMenu,
  getImages,
} from '../../actions/dashboard';
import spinner from '../layout/Spinner';
import styles from './Dashboard.module.css';

const Dashboard = ({
  getCurrentDashboard,
  getMenu,
  getImages,
  dashboard: { profile, menu, images, loading },
}) => {
  useEffect(() => {
    getCurrentDashboard();
    getMenu();
  }, []);

  useEffect(() => {
    if (profile) {
      getImages(profile.restaurant_id);
    }
  }, [profile]);

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
            src={`http://localhost:3001/images/dish/${file}`}
            alt='Dish_Image'
          />
        );
      }
    });
  };

  const displayMenuItems = () => {
    return menu.map((item) => {
      return (
        <Fragment>
          <tr>
            <td>
              <div className={styles.bold}>
                {item.item_name} <br /> <br />
                <i>({item.item_description})</i> <br />
                <br />
                <Link
                  className={styles.update_btn}
                  to={{
                    pathname: '/restaurant/item/update',
                    state: { itemId: item.item_id },
                  }}
                >
                  Update item/Add Images
                </Link>
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
            <td className={styles.bold}>{item.item_ingredients}</td>
            <td className={styles.bold}>{item.item_category}</td>
            <td className={styles.bold}>${item.item_price}</td>
          </tr>
        </Fragment>
      );
    });
  };

  let imgSrc;
  if (profile) {
    imgSrc = `http://54.183.239.208:3001/images/restaurant/${profile.restaurant_image}`;
  }

  return loading && profile === null ? (
    spinner
  ) : (
    <Fragment>
      <div className='top-images'>{displayImages()}</div>
      <div className={styles.container}>
        <div className={styles.left}>
          {/* <h3>{profile.restaurant_name}</h3> */}
          <img src={imgSrc} alt='Profile_pic' />
          <h3 className={styles.title}>{profile.restaurant_name}</h3>
          <h3 className={styles.subheading}>Contact information</h3>
          <h4 className={styles.title}>
            <i class='far fa-envelope-open'></i> Email
          </h4>
          <p>{profile.restaurant_email_id}</p>
          <h4 className={styles.title}>
            <i class='fas fa-phone'></i> Phone
          </h4>
          <p>{profile.restaurant_phone}</p>
        </div>
        <div className={styles.middle}>
          <div className={styles.middle_heading}>
            <h1 className={styles.name}>{profile.restaurant_name}</h1>
            <h3>
              <i class='fas fa-map-marker-alt'></i>{' '}
              {profile.restaurant_location}
            </h3>
            <h3>
              <i class='fas fa-clock'></i> {profile.timings}
            </h3>
          </div>
          <hr />
          <h2 className={styles.activity}>Description</h2>
          {!profile.description ? (
            <p>Tell us about your restaurant...</p>
          ) : (
            <Fragment>
              <h3 className={styles.description}>{profile.description}</h3>
            </Fragment>
          )}
          <hr />
          <h2 className={styles.activity}>Your Menu</h2>
          {/* {displayImages()} */}
          <table>
            <tr>
              <th>Dish Name</th>
              <th>Ingredients</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
            {displayMenuItems()}
          </table>
        </div>
        <div className={styles.right}>
          <h3 className={styles.right_heading}>Updates</h3>
          <div className={styles.update_links}>
            <Link to='/restaurant/update/basic' className={styles.btn}>
              <i class='fas fa-address-card'></i> Update Profile
            </Link>
            <Link to='/restaurant/add/dish' className={styles.btn}>
              <i class='fas fa-utensils'></i> Add Dishes
            </Link>
            <h3 className={styles.right_heading}>Reviews</h3>
            <Link to='/restaurant/view/reviews' className={styles.btn}>
              <i class='fas fa-user-friends'></i> View Reviews
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentDashboard: PropTypes.func.isRequired,
  getMenu: PropTypes.func.isRequired,
  dashboard: PropTypes.object.isRequired,
  getImages: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
});

export default connect(mapStateToProps, {
  getCurrentDashboard,
  getMenu,
  getImages,
})(Dashboard);
