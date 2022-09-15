import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuidv4 } from 'uuid';

/**
 * Want to be able to dispatch more than one alert
 *
 * Because we have thunk installed we can use dispatch
 *
 * We installed uuid so that we can give a unique id to our alerts
 */
export const setAlert =
  (msg, alertType, timeout = 3000) =>
  (dispatch) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id }
    });

    // After three seconds this is going to dispatch removeAlert with a payload of id
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
