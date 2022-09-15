/** Redux store
 * This is basically going to be our boilerplate
 * thunk is middleware
 *
 * All of our initial state will be in the initialState object
 *
 * Have to then initialize in the App.js file
 */

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
