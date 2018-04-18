import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router';
import logo from './logo.svg';
import './Site.css';

class Site extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn && nextProps.shouldRedirect) {
      nextProps.redirectTo(nextProps.nextPath || '/');
    }
    if (nextProps.loggedIn && Object.keys(nextProps.profile).length === 0) {
      const { fetchProfile, accessToken } = nextProps;
      fetchProfile(accessToken);
    }
  }

  renderUserControls() {
    const { loggedIn, onLogout, profile } = this.props;

    if (loggedIn) {
      return (
        <div className="Site-profileControls">
          <img className="Site-profilePicture" src={profile.picture} alt={profile.nickname} />
          <Link to="/profile/edit">{profile.nickname}</Link> &middot;
          <button onClick={onLogout}>Log Out</button>
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
          {this.props.children}
        </div>
      </div>
    );
  }
}

Site.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  fetchProfile: PropTypes.func.isRequired,
  redirectTo: PropTypes.func.isRequired,
  shouldRedirect: PropTypes.bool.isRequired,
  accessToken: PropTypes.string,
  nextPath: PropTypes.string,
  profile: PropTypes.shape({
    picture: PropTypes.string,
    nickname: PropTypes.string,
  }).isRequired,
};

export default Site;
