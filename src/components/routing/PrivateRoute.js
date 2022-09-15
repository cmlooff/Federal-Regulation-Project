import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, connect } from 'react-redux';

/**
 * We're taking in a component prop from App.js
 */
// const { isAuthenticated, loading } = auth;
// Where we're checking if we're authenticated
const PrivateRoute = ({ auth: { isAuthenticated, loading } }) => {
  // <Navigate to='/login' />
  return !isAuthenticated && !loading ? <Navigate to='/login' /> : <Outlet />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  // Pulling all the state in the auth reducer
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
