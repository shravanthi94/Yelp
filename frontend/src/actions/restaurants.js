import axios from 'axios';
import { setAlert } from './alert';
import {
  ALL_RESTAURANTS,
  ALL_RESTAURANTS_ERROR,
  GET_RESTAURANT,
  RESTAURANT_ERROR,
  PLACEORDER,
  PLACEORDER_ERROR,
  ADD_REVIEW,
  ADD_REVIEW_ERROR,
} from './types';

export const getAllRestaurants = () => async (dispatch) => {
  try {
    const res = await axios.get('/restaurant/profile/all');
    dispatch({
      type: ALL_RESTAURANTS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ALL_RESTAURANTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getRestaurant = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/restaurant/profile/${id}`);
    dispatch({
      type: GET_RESTAURANT,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: RESTAURANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const placeorder = (resId, deliveryOpt, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const restaurant_id = resId,
      delivery_option = deliveryOpt;

    const body = JSON.stringify({ restaurant_id, delivery_option });
    const res = await axios.post(`/customer/orders/placeorder`, body, config);

    dispatch(setAlert('Order placed', 'success'));

    dispatch({
      type: PLACEORDER,
      payload: res.data,
    });

    history.push(`/restaurant/details/${resId}`);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PLACEORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const writeReview = (resId, formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(`/reviews/insert/${resId}`, formData, config);

    dispatch(setAlert('Review added', 'success'));

    dispatch({
      type: ADD_REVIEW,
    });

    history.push(`/restaurant/details/${resId}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ADD_REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
