import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Fetch the alert state array into this component
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

// Mapping the redux state to a prop component
const mapStateToProps = state => ({
  // Get state from alert reducer
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
