import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Auth0Lock from 'auth0-lock';
import { Redirect } from 'react-router-dom';

import './Login.css';

const LOGIN_ROUTE = '/login';

if (!process.env.REACT_APP_AUTH0_CLIENT_ID || !process.env.REACT_APP_AUTH0_DOMAIN) {
  throw new Error('Please define `REACT_APP_AUTH0_CLIENT_ID` and `REACT_APP_AUTH0_DOMAIN` in your .env file');
}

class Login extends Component {
  componentDidMount() {
    const userLang = navigator.language || navigator.userLanguage;
    this.lock = new Auth0Lock(
      process.env.REACT_APP_AUTH0_CLIENT_ID,
      process.env.REACT_APP_AUTH0_DOMAIN, {
        auth: {
          redirectUrl: `${window.location.origin}${LOGIN_ROUTE}/callback`,
          responseType: 'token',
        },
        language: userLang,
      },
    );

    if (this.props.location.pathname === '/login' && !this.props.login.loggedIn) {
      this.props.authenticating(this.props.location.state ? this.props.location.state.from : '/');
      this.lock.show();
    }

    this.lock.on('authenticated', authResult => this.props.authenticate(authResult));

    this.lock.on('hide', () => this.props.history.push('/'));
  }

  render() {
    const { from } = this.props.login || { from: '/' };
    const { redirectToReferrer } = this.props.login || { redirectToReferrer: false };
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <div id="lock-react" />
    );
  }
}

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
  authenticating: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    state: PropTypes.shape({ from: PropTypes.string }),
  }).isRequired,
  login: PropTypes.shape({ loggedIn: PropTypes.bool }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Login;
