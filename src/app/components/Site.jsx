import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import logo from './logo.svg';
import './Site.css';
import Home from './Home';
import EditProfile from '../../profile/containers';
import LoadableLogin from '../../login/components/LoadableLogin';
import { PrivateRoute } from '../../login/components/auth';
import { Logout } from '../../login/components/logout';


class Site extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.login.loggedIn && Object.keys(nextProps.profile).length === 0) {
      nextProps.fetchProfile(nextProps.login.accessToken);
    }
  }

  renderUserControls() {
    const { profile } = this.props;

    if (this.props.login.loggedIn) {
      return (
        <div className="Site-profileControls">
          <img className="Site-profilePicture" src={profile.picture} alt={profile.nickname} />
          <Link to="/profile/edit">{profile.nickname}</Link> &middot;
          <Link to="/logout">logout</Link>
        </div>
      );
    }
    return (
      <div className="Site-profileControls">
        <span>Guest</span> &middot; <Link to="/login">Log In</Link>
      </div>
    );
  }

  render() {
    return (
      <div className="Site">
        <div className="Site-header">
          <img src={logo} className="Site-logo" alt="logo" />
          <h2>Welcome to React + Auth0</h2>
          {this.renderUserControls()}
        </div>
        <div className="Site-page">
          <Switch>
            <Route path="/login" exact component={LoadableLogin} />
            <Route path="/login/callback" exact component={LoadableLogin} />
            <Route path="/logout" component={Logout} />
            <PrivateRoute path="/profile/edit" component={EditProfile} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </div>
    );
  }
}

Site.propTypes = {
  login: PropTypes.shape({
    loggedIn: PropTypes.bool,
    accessToken: PropTypes.string,
  }).isRequired,
  fetchProfile: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    picture: PropTypes.string,
    nickname: PropTypes.string,
  }).isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line
};

export default Site;
