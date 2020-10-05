import axios from 'axios';
import { setAlert } from './alert';
import {
  SEARCH_RESTAURANTS,
  SEARCH_RESTAURANTS_ERROR,
  RESULTS,
  RESULTS_ERROR,
  CLEAR_RESULTS,
} from './types';

//  Get restaurants based on query
export const getQueryResults = (searchData) => async (dispatch) => {
  try {
    const res = await axios.get(`/search/restaurants/${searchData}`);

    dispatch({
      type: SEARCH_RESTAURANTS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: SEARCH_RESTAURANTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//  Get restaurants based on query
export const displayRestaurants = (restaurants) => async (dispatch) => {
  console.log('2 here', restaurants);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ restaurants });
  try {
    console.log(body);

    const res = await axios.get('/search/display/all', body, config);

    console.log('success');
    console.log(res);

    dispatch({
      type: RESULTS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: RESULTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// home
export const clearResults = () => (dispatch) => {
  dispatch({
    type: CLEAR_RESULTS,
  });
};
