import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './EditProfile.css';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.locationInput = React.createRef();
    // This binding is necessary to make `this` work in the callback
    this.updateOnSubmit = this.updateOnSubmit.bind(this);
  }

  updateOnSubmit(event) {
    event.preventDefault();
    this.props.updateProfile(this.props.profile.user_id, this.props.idToken, {
      user_metadata: {
        location: this.locationInput.current.value,
      },
    });
  }

  render() {
    const { profile, saving, saved } = this.props;
    const userMetadata = profile.user_metadata || {};

    return (
      <div className="EditProfile">
        <div className="EditProfile-heading">Your Profile</div>
        <div className="EditProfile-profile">
          <p><strong>Nickname:</strong> {profile.nickname}</p>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Created At:</strong> {profile.created_at}</p>
          <p><strong>Updated At:</strong> {profile.updated_at}</p>
          <p><strong>Location:</strong> {userMetadata.location || 'unknown'}</p>
        </div>
        <div className="EditProfile-heading">Edit Profile</div>
        <form className="EditProfile-form" onSubmit={this.updateOnSubmit}>
          <fieldset className="EditProfile-fieldset" disabled={saving}>
            <label className="EditProfile-locationLabel" htmlFor="location">Location
              <input
                ref={this.locationInput}
                className="EditProfile-locationInput"
                id="location"
                type="text"
                placeholder="City or State"
                defaultValue={userMetadata.location}
              />
            </label>
            <div className="EditProfile-formControls">
              <button className="EditProfile-submitButton" type="submit">
                {saving ? 'Saving...' : 'Save'}
              </button>
              {saved && (
                <div className="EditProfile-saved">Saved</div>
              )}
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

EditProfile.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    user_id: PropTypes.string.isRequired,
  }).isRequired,
  idToken: PropTypes.string.isRequired,
  saving: PropTypes.bool,
  saved: PropTypes.bool,
};

EditProfile.defaultProps = {
  saved: false,
  saving: false,
};

export default EditProfile;
