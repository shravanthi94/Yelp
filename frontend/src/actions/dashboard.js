import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_DASHBOARD,
  DASHBOARD_ERROR,
  ADD_DISH_SUCCESS,
  ADD_DISH_ERROR,
  GET_MENU,
  GET_MENU_ERROR,
  GET_REVIEWS,
  GET_REVIEWS_ERROR,
  RES_IMAGE_ERROR,
  GET_IMAGES,
} from './types';

//Get current users profile
export const getCurrentDashboard = () => async (dispatch) => {
  try {
    const res = await axios.get('/restaurant/profile');
    console.log(res.data);
    dispatch({
      type: GET_DASHBOARD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DASHBOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//  Update profile details
export const updateRestaurantProfile = (
  formData,
  history,
  edit = false,
) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/restaurant/profile/basic', formData, config);
    console.log(res);
    dispatch({
      type: GET_DASHBOARD,
      payload: res.data,
    });

    dispatch(setAlert('Restaurant profile updated', 'success'));

    if (!edit) {
      history.push('/restaurant/profile');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: DASHBOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//  Add a dish
export const addDish = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/restaurant/profile/menu', formData, config);
    console.log(res);
    dispatch({
      type: ADD_DISH_SUCCESS,
    });

    dispatch(setAlert('Dish added successfully', 'success'));

    history.push('/restaurant/profile');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ADD_DISH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all menu items
export const getMenu = () => async (dispatch) => {
  try {
    const res = await axios.get('/restaurant/profile/menuitems/all');
    console.log(res.data);
    dispatch({
      type: GET_MENU,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_MENU_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update a dish
export const updateDish = (formData, history, itemId, edit = false) => async (
  dispatch,
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      `/restaurant/profile/menu/${itemId}`,
      formData,
      config,
    );
    console.log(res);
    dispatch({
      type: ADD_DISH_SUCCESS,
    });

    dispatch(setAlert('Dish item updated', 'success'));

    if (!edit) {
      history.push('/restaurant/profile');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ADD_DISH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//  Get all reviews
export const getRestaurantReviews = () => async (dispatch) => {
  try {
    const res = await axios.get('/reviews/restaurant');
    console.log(res.data);
    dispatch({
      type: GET_REVIEWS,
      payload: res.data,
    });
  } catch (err) {
    if (err.response) {
      dispatch({
        type: GET_REVIEWS_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

export const uploadRestaurantImage = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    const res = await axios.post('/images/restaurant', formData, config);
    console.log(res);

    dispatch(setAlert('Image Uploaded', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: RES_IMAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const uploadDishImage = (formData, dishId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    const res = await axios.post(`/images/dish/${dishId}`, formData, config);
    console.log(res);

    dispatch(setAlert('Item Image Uploaded', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: RES_IMAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//  Get all images
export const getImages = (resId) => async (dispatch) => {
  try {
    const res = await axios.get(`/images/restaurant/all/${resId}`);
    console.log(res.data);
    dispatch({
      type: GET_IMAGES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: RES_IMAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
