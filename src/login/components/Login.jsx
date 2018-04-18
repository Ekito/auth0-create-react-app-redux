import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Auth0Lock from 'auth0-lock';
import './Login.css';

const LOGIN_ROUTE = '/login';
const APP_ROOT = '/';

if (!process.env.REACT_APP_AUTH0_CLIENT_ID || !process.env.REACT_APP_AUTH0_DOMAIN) {
  throw new Error('Please define `REACT_APP_AUTH0_CLIENT_ID` and `REACT_APP_AUTH0_DOMAIN` in your .env file');
}


class Login extends Component {
  componentDidMount() {
    this.lock = new Auth0Lock(
      process.env.REACT_APP_AUTH0_CLIENT_ID,
      process.env.REACT_APP_AUTH0_DOMAIN, {
        auth: {
          redirectUrl: `${window.location.origin}${LOGIN_ROUTE}/callback`,
          responseType: 'token',
        },
      },
    );
    // FIXME should remove transfert to ROOT ?
    if (this.props.currentPath === LOGIN_ROUTE) {
      if (!this.props.nextPath) {
        this.props.actions.setNextPath(APP_ROOT);
      }
      this.lock.show();
    }

    this.lock.on('authenticated', authResult => this.props.actions.authenticate(authResult));

    this.lock.on('hide', () => this.props.actions.redirectTo(APP_ROOT, this.props.history));
  }

  render() {
    return (
      <div id="lock-react" />
    );
  }
}

Login.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.func).isRequired,
  currentPath: PropTypes.string.isRequired,
  nextPath: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Login;
