import { SIGNUP_SUCCESS, SIGNUP_FAIL } from './types';
import { setAlert } from './alert';
import axios from 'axios';

export const signup = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/customer/register', body, config);

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};
