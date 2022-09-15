import axios from 'axios';
import { setAlert } from './alert';
import { GET_REGULATION, REGULATION_ERROR } from './types';

/** Get Current User Profile
 * Remember that this initializes the reducers to change state
 *
 * We're going to make the request via axios TO /api/profile/me -> /routes/api/profile.js
 * We don't have to pass in an ID b/c our server is going to know which profile to load from the token we sent which has the ID
 * Our payload is going to have the user information now (res.data)
 */
export const getCurrentRegulation = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
