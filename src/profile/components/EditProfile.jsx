import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './EditProfile.css';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.locationInput = React.createRef();
    // This binding is necessary to make `this` work in the callback
    this.updateOnSubmit = this.updateOnSubmit.bind(this);
    this.state = { editing: true };
  }

  updateOnSubmit(event) {
    event.preventDefault();
    this.props.updateProfile(this.props.profile.user_id, this.props.idToken, {
      user_metadata: {
        location: this.locationInput.current.value,
      },
    });
    this.setState({ editing: false });
  }

  updateContent() {
    this.setState({ editing: true });
  }

  render() {
    const { profile } = this.props;
    const userMetadata = profile.user_metadata || {};
    /* eslint-disable jsx-a11y/label-has-for */
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
          <fieldset className="EditProfile-fieldset" disabled={this.props.profile.saving}>
            <label className="EditProfile-locationLabel" htmlFor="location">Location</label>
            <input
              ref={this.locationInput}
              className="EditProfile-locationInput"
              id="location"
              type="text"
              placeholder="City or State"
              defaultValue={userMetadata.location}
              onChange={e => this.updateContent(e)}
            />
            <div className="EditProfile-formControls">
              <button className="EditProfile-submitButton" type="submit">
                {this.props.profile.saving ? 'Saving...' : 'Save'}
              </button>
              {this.props.profile.saved && !this.state.editing && (
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
    saved: PropTypes.bool,
    saving: PropTypes.bool,
  }).isRequired,
  idToken: PropTypes.string.isRequired,
};


export default EditProfile;
