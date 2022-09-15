/**
 * A function that takes in a piece of state and an action
 * initial state would be an array of objects
 *
 * The action takes in a type and payload
 * type is what we're evaluating
 *
 * For our switch/case -> Depending on the type we need to decide what we want to send down as far as state
 *
 * * Remember state is immutable -> [...state, 'adding our new alert']
 */
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
