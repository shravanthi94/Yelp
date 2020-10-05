import {
  ALL_RESTAURANTS,
  ALL_RESTAURANTS_ERROR,
  GET_RESTAURANT,
  RESTAURANT_ERROR,
  PLACEORDER,
  PLACEORDER_ERROR,
  ADD_REVIEW,
  ADD_REVIEW_ERROR,
  GET_RES_MENU,
  GET_RES_MENU_ERROR,
  GET_CUSTOMER_REVIEW,
  CUSTOMER_REVIEW_ERROR,
} from '../actions/types';

const initialState = {
  restaurant: '',
  menu: '',
  review: '',
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
        restaurant: '',
        menu: '',
        restaurants: payload,
        loading: false,
      };
    case GET_RESTAURANT:
      return {
        ...state,
        restaurant: payload,
        loading: false,
      };
    case GET_RES_MENU:
      return {
        ...state,
        menu: payload,
        loading: false,
      };
    case GET_CUSTOMER_REVIEW:
      return {
        ...state,
        review: payload,
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
    case GET_RES_MENU_ERROR:
    case CUSTOMER_REVIEW_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
