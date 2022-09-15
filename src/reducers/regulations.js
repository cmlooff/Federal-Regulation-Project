/**
 * Get profile
 * Create,
 * Clear,
 * from state
 *
 * Profile is going to make a request and hold all of our profile data -> The profile state will hold the individual user profile data state
 *
 * Profiles will hold the full list of users -> The Profiles state will hold that
 */

import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  // Petitions is taking place of github repos -> This will hold our petitions that we've made
  petitions: [],
  loading: true,
  error: {} // Hold any errors in the request
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        petitions: [],
        loading: false
      };

    default:
      return state;
  }
}
