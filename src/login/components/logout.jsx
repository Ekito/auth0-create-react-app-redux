import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { logout } from '../actions';

const LogoutComponent = class extends React.Component {
  componentWillMount() {
    this.props.history.push('/');
    this.props.logout();
  }

  render() {
    return null;
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  logout,
}, dispatch);

LogoutComponent.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  logout: PropTypes.func.isRequired,
};

export const Logout = connect(null, mapDispatchToProps)(LogoutComponent);
export default Logout;
