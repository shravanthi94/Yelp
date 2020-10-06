import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentDashboard, getMenu } from '../../actions/dashboard';
import spinner from '../layout/Spinner';
import styles from './Dashboard.module.css';
// import menus from './menu.module.css';

const Dashboard = ({
  getCurrentDashboard,
  getMenu,
  auth,
  dashboard: { profile, menu, loading },
}) => {
  useEffect(() => {
    getCurrentDashboard();
    getMenu();
  }, []);

  const displayMenuItems = () => {
    return menu.map((item) => {
      return (
        <Fragment>
          <tr>
            <td>
              <div>
                {item.item_name} <br />
                {item.item_description} <br />
                <Link
                  to={{
                    pathname: '/restaurant/item/update',
                    state: { itemId: item.item_id },
                  }}
                >
                  Update item
                </Link>
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

  let imgSrc;
  if (profile) {
    if (!profile.restaurant_image) {
      imgSrc = `http://localhost:3001/images/restaurant/none`;
    } else {
      imgSrc = `http://localhost:3001/images/restaurant/${profile.restaurant_image}`;
    }
  }

  return loading && profile === null ? (
    spinner
  ) : (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.left}>
          {/* <h3>{profile.restaurant_name}</h3> */}
          <img src={imgSrc} alt='Profile_pic' />
          <h3 className={styles.title}>{profile.restaurant_name}</h3>
          <h3 className={styles.subheading}>Contact information</h3>
          <h4 className={styles.title}>Email</h4>
          <p>{profile.restaurant_email_id}</p>
          <h4 className={styles.title}>Phone</h4>
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
          <h2 className={styles.activity}>Your Menu</h2>
          <table>
            <tr>
              <th>Dish Name</th>
              <th>Ingredients</th>
              <th>Item Category</th>
              <th>Price</th>
            </tr>
            {displayMenuItems()}
          </table>
        </div>
        <div className={styles.right}>
          <div className={styles.update_links}>
            <Link to='/restaurant/update/basic' className={styles.btn_update}>
              <i class='fas fa-address-card'></i> Update Profile
            </Link>
            <Link to='/restaurant/add/dish' className={styles.btn_update}>
              <i class='fas fa-utensils'></i> Add Dishes
            </Link>
            <Link to='/restaurant/view/reviews' className={styles.btn_update}>
              <i class='fas fa-user-friends'></i> View Reviews
            </Link>
          </div>
          {/* <div>
            <h3 className={styles.subheading}>About {profile.customer_name}</h3>
            <h4 className={styles.title}>Location</h4>
            <p>
              {profile.city}, {profile.state}, {profile.country}
            </p>
            <h4 className={styles.title}>Yelping Since</h4>
            <p>{profile.yelping_since}</p>
            <h4 className={styles.title}>Things I Love</h4>
            {!profile.things_i_love ? (
              <p>You haven't added anything yet</p>
            ) : (
              <p>{profile.things_i_love}</p>
            )}
          </div> */}
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentDashboard: PropTypes.func.isRequired,
  getMenu: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  dashboard: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  dashboard: state.dashboard,
});

export default connect(mapStateToProps, { getCurrentDashboard, getMenu })(
  Dashboard,
);
