import React, { useEffect } from 'react';
import ReactDOM from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Petition from './components/layout/Petition';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import PrivateRoute from './components/routing/PrivateRoute';

/** Redux
 * Provider is what connects react and redux
 */
import { Provider } from 'react-redux';
import store from './store';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // useEffect takes in a function
  useEffect(() => {
    // Dispatch is a function of store -> we have access to the store
    store.dispatch(loadUser());
    // We put [] to run through the useEffect once
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route exact path='/petition' element={<Petition />} />
        </Routes>
        <section className='container'>
          <Alert />
          <Routes>
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/login' element={<Login />} />
            <Route path='/dashboard' element={<PrivateRoute />}>
              <Route
                path=''
                element={
                  <section className='container'>
                    <Dashboard />
                  </section>
                }
              />
            </Route>
            <Route path='/create-profile' element={<PrivateRoute />}>
              <Route
                path=''
                element={
                  <section className='container'>
                    <CreateProfile />
                  </section>
                }
              />
            </Route>
          </Routes>
        </section>
      </Router>
    </Provider>
  );
};

// Making this file available to other files -> Connects to
export default App;
