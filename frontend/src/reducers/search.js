import {
  SEARCH_RESTAURANTS,
  SEARCH_RESTAURANTS_ERROR,
  RESULTS,
  RESULTS_ERROR,
  CLEAR_RESULTS,
} from '../actions/types';

const initialState = {
  restaurantlist: [],
  results: [],
  loading: true,
  errors: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_RESTAURANTS:
      return {
        ...state,
        restaurantlist: payload,
        loading: false,
      };
    case RESULTS:
      return {
        ...state,
        results: payload,
        loading: false,
      };
    case CLEAR_RESULTS:
      return {
        ...state,
        restaurantlist: [],
        loading: false,
      };
    case SEARCH_RESTAURANTS_ERROR:
    case RESULTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
