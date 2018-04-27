import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class PrivateRouteComponent extends Route {

  render() {
    const Component = this.props.component;
    return this.props.login.loggedIn ? <Component {...this.props} /> : <Redirect
      to={{
        pathname: '/login',
        state: { from: this.props.location.pathname },
      }}
    />;
  }
}

const mapStateToProps = state => ({
  login: state.login,
});

export const PrivateRoute = withRouter(connect(
  mapStateToProps,
)(PrivateRouteComponent));

export default PrivateRoute;

/*export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (rest.loggedIn ?
            (<Component {...props} />) : (
              <Redirect
                to={{
              pathname: '/login',
              state: { from: props.location.pathname },
            }}
              />
        ))
      }
  />);

PrivateRoute.propTypes = {
  component: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};*/
