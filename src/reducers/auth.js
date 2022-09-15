/**
 * 1. Register a user
 * We're going to store our jwt token in local storage
 * isAuthenticated is default to null
 * loading -> We want to make sure that loading is done before we get the response
 */

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from '../actions/types';

const initialState = {
  // Retrieving the token
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      // Want to put the token inside local storage -> Setting the token to payload.token
      localStorage.setItem('token', payload.token);
      return {
        // The state we want to return
        ...state,
        ...payload,
        isAuthenticated: true,
        // We got the response, now we set loading to false b/c we're done loading
        loading: false
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        // The payload has the user data minus the password
        user: payload
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      // Remove anything in local storage in that token
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };

    default:
      return state;
  }
}
