import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  /**
   * Whenever you map through an array in jsx it's a list that needs a unique key
   */
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

/**
 * We are mapping the REDUX state to a PROP so that we can have access to it
 * Note: Our reducers are the ones directly changing and accessing our state
 * * Our reducer index.js is the reducerCombiner
 */
const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
