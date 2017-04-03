import React, {Component} from 'react';
import './Login.css';
import Auth0Lock from 'auth0-lock';

const LOGIN_ROUTE = '/login';
const APP_ROOT = '/';

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
    //FIXME should remove transfert to ROOT ?
    if (this.props.currentPath === LOGIN_ROUTE)
    {
      if (!this.props.nextPath) {
        this.props.actions.setNextPath(APP_ROOT);
      }
      lock.show();
    }

    lock.on('authenticated', authResult => {
      return this.props.actions.authenticate(authResult);
    });

    lock.on('hide', () => this.props.actions.redirectTo(APP_ROOT));
  }

  render() {
    return (
      <div id="lock-react"/>
    );
  }
}

Login.propTypes = {
  actions: React.PropTypes.arrayOf(React.PropTypes.func),
  currentPath: React.PropTypes.string,
  nextPath: React.PropTypes.string
}

export default Login;
