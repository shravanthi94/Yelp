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
  //   console.log('searchData: ', searchData);

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

  const displayFilters = () => {
    return (
      <Fragment>
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
        <br />
        <div className={styles.near}>
          <button className={styles.btn} onClick={() => getLocation()}>
            Neighborhoods
          </button>
          <br />
          <Link
            className={styles.submit_btn}
            to={`/search/nearby/${filterData}`}
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

  return loading ? (
    spinner
  ) : (
    <Fragment>
      <div className='container'>
        <h1 className={styles.form_title}>Search Results</h1>
        {displayFilters()}
        {displayRestaurants()}
        <hr />
        <br />
        <Link to='/' className={styles.back_btn}>
          Back to Search
        </Link>
      </div>
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
