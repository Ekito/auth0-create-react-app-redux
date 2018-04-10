import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import logo from './logo.svg';
import './Site.css';

class Site extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    return (
      <div className="Site">
        <div className="Site-header">
          <img src={logo} className="Site-logo" alt="logo"/>
          <h2>Welcome to React + Auth0</h2>
          {this.renderUserControls()}
        </div>
        <div className="Site-page">
          {this.props.children}
        </div>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn && nextProps.shouldRedirect) {
      nextProps.redirectTo(nextProps.nextPath || "/");
    }
    if (nextProps.loggedIn && Object.keys(nextProps.profile).length === 0 ) {
      const {fetchProfile, accessToken} = nextProps;
      console.log("fetching");
      fetchProfile(accessToken);
    }
  }

  renderUserControls() {
    const {loggedIn, onLogout, profile} = this.props;

    if (loggedIn) {
      return (
        <div className="Site-profileControls">
          <img className="Site-profilePicture" src={profile.picture} alt={profile.nickname} />
          <Link to="/profile/edit">{profile.nickname}</Link> &middot; <a onClick={onLogout}>Log Out</a>
        </div>
      );
    } else {
      return (
        <div className="Site-profileControls">
          <span>Guest</span> &middot; <Link to="/login">Log In</Link>
        </div>
      );
    }
  }
}

Site.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
}

export default Site;
