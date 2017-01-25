import React, {Component} from 'react';
import './Login.css';
import Auth0Lock from 'auth0-lock';

const LOGIN_ROUTE = '/login';

if (!process.env.REACT_APP_AUTH0_CLIENT_ID || !process.env.REACT_APP_AUTH0_DOMAIN) {
  throw new Error('Please define `REACT_APP_AUTH0_CLIENT_ID` and `REACT_APP_AUTH0_DOMAIN` in your .env file');
}

const lock = new Auth0Lock(
  process.env.REACT_APP_AUTH0_CLIENT_ID,
  process.env.REACT_APP_AUTH0_DOMAIN, {
    auth: {
      redirectUrl: `${window.location.origin}${LOGIN_ROUTE}/callback`,
      responseType: 'token'
    }
  }
);

class Login extends Component {
  componentDidMount() {
    if (this.props.route.path === '/login')
    {
      if (!this.props.nextPath) {
        this.props.setNextPath('/');
      }
      lock.show();
    }
    const authenticate = this.props.authenticate;
    lock.on('authenticated', authResult => {
      return authenticate(authResult);
    });

    lock.on('hide', () => this.props.redirectTo('/'));
  }

  render() {
    return (
      <div/>
    );
  }
}

export default Login;
