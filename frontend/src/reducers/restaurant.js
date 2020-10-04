import {
  ALL_RESTAURANTS,
  ALL_RESTAURANTS_ERROR,
  GET_RESTAURANT,
  RESTAURANT_ERROR,
  PLACEORDER,
  PLACEORDER_ERROR,
  ADD_REVIEW,
  ADD_REVIEW_ERROR,
} from '../actions/types';

const initialState = {
  restaurant: '',
  restaurants: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_RESTAURANTS:
      return {
        ...state,
        restaurants: payload,
        loading: false,
      };
    case GET_RESTAURANT:
      return {
        ...state,
        restaurant: payload,
        loading: false,
      };
    case PLACEORDER:
      return {
        ...state,
        loading: false,
      };
    case ALL_RESTAURANTS_ERROR:
    case RESTAURANT_ERROR:
    case PLACEORDER_ERROR:
    case ADD_REVIEW_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
