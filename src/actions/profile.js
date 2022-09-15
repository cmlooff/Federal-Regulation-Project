import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './types';

/** Get Current User Profile
 * Remember that this initializes the reducers to change state
 *
 * We're going to make the request via axios TO /api/profile/me -> /routes/api/profile.js
 * We don't have to pass in an ID b/c our server is going to know which profile to load from the token we sent which has the ID
 * Our payload is going to have the user information now (res.data)
 */
export const getCurrentProfile = () => async (dispatch) => {
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

// Create or update a profile -> Redirect after we submit form. History Object that has a method of Push -> In order to know if we are editing a profile -> Edit to false
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      // Sending data -> Config
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      // Post request to api/profile
      const res = await axios.post('/api/profile', formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });

      // If edit is true ->
      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      );

      // If we're creating a new profile...
      if (!edit) {
        history.push('/dashboard');
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, 'danger'));
        });
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

// Add Petition -> Was add experience
export const addPetition = (formData, history) => async (dispatch) => {
  try {
    // Sending data -> Config
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // Post request to api/profile
    const res = await axios.put('/api/profile/petitions', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      // This res.data should be the profile
      payload: res.data
    });

    // If edit is true ->
    dispatch(setAlert('Petition Added', 'success'));

    // If we're creating a new profile...
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    // Sending data -> Config
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // Post request to api/profile
    const res = await axios.put('/api/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      // This res.data should be the profile
      payload: res.data
    });

    // If edit is true ->
    dispatch(setAlert('Experience Added', 'success'));

    // If we're creating a new profile...
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Petition
export const deletePetition = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/petitions/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Petition removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
