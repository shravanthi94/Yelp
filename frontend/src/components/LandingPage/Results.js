import React, { useEffect, Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../layout/Spinner';
import styles from './Landing.module.css';
import { getQueryResults } from '../../actions/search';
import { getAllRestaurants } from '../../actions/restaurants';
import Geocode from 'react-geocode';

const Results = ({
  match,
  getQueryResults,
  getAllRestaurants,
  search: { restaurantlist, loading },
  restaurant: { restaurants },
}) => {
  const [filterData, setfilterData] = useState('');

  const searchData = match.params.query;

  useEffect(() => {
    getAllRestaurants();
    getQueryResults(searchData);
  }, []);

  const displayRestaurants = () => {
    if (restaurantlist.length === 0) {
      return '';
    }
    const ids = restaurantlist.map((each) => each.restaurant_id);
    // console.log('ID:', ids);
    return restaurants.map((res) => {
      if (ids.includes(res.restaurant_id)) {
        return (
          <Fragment>
            <div className='box border' style={{ color: 'black' }}>
              <article className='media'>
                <div className='media-content'>
                  <div class='content'>
                    <div className='columns'>
                      <div className='column is-5'>
                        <img
                          className={styles.img}
                          src={`http://localhost:3001/images/restaurant/${res.restaurant_image}`}
                          alt='Restaurant_image'
                        />
                      </div>
                      <div className='column is-7'>
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

  const displayFilters = () => {
    return (
      <Fragment>
        <div className={styles.filters}>
          <select
            className='select-css'
            name='status'
            onChange={(e) => setfilterData(e.target.value)}
          >
            <option>Select delivery option</option>
            <option value='DINEIN'>Dine In</option>
            <option value='DELIVERY'>Yelp Delivery</option>
            <option value='CURBSIDE'>Curbside Pickup</option>
          </select>
          <br />
          <Link
            className={styles.submit_btn}
            to={{
              pathname: `/search/results/${filterData}`,
              state: { query: searchData },
            }}
          >
            Apply
          </Link>
        </div>
        <br />
        <div className={styles.near}>
          <button className={styles.btn} onClick={() => getLocation()}>
            Neighborhoods
          </button>
          <br />
          <Link
            className={styles.submit_btn}
            to={{
              pathname: `/search/nearby/${filterData}`,
              state: { query: searchData },
            }}
          >
            Submit
          </Link>
        </div>
      </Fragment>
    );
  };

  let lat, lon;

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      lat = position.coords.latitude.toString();
      lon = position.coords.longitude.toString();
      console.log('Latitude is :', lat);
      console.log('Longitude is :', lon);

      Geocode.setApiKey('AIzaSyDm3j_pnpxldUWSZYWsXolf4PDktU5NiHs');
      Geocode.setLanguage('en');
      Geocode.setRegion('es');
      // Get address from latitude & longitude.
      Geocode.fromLatLng(lat, lon).then(
        (response) => {
          const address = response.results[0].address_components[4].long_name;
          console.log('Geocode: ', address);
          setfilterData(address);
        },
        (error) => {
          console.error(error);
        },
      );
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
      if (ids.includes(res.restaurant_id)) {
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
          {displayFilters()}
          {displayRestaurants()}
        </div>
        <div className='column is-5'>{displayMaps()}</div>
      </div>
      <br />
      <Link
        to='/'
        className={styles.back_btn}
        style={{ marginLeft: '6%', marginBottom: '2%' }}
      >
        Back to Search
      </Link>
    </Fragment>
  );
};

Results.propTypes = {
  getQueryResults: PropTypes.func.isRequired,
  getAllRestaurants: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
  restaurant: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
  restaurant: state.restaurant,
});

export default connect(mapStateToProps, {
  getQueryResults,
  getAllRestaurants,
})(Results);
