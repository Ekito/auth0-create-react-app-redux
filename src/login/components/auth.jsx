import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

export const PrivateRoute = ({ component: Component, ...rest }) => (
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
};

export default PrivateRoute;
