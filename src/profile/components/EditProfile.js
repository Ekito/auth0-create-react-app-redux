import React, {Component} from 'react';
import './EditProfile.css';

class EditProfile extends Component {

  render() {
    const {profile, saving, saved} = this.props;
    const user_metadata = profile.user_metadata || {};

    return (
      <div className="EditProfile">
        <div className="EditProfile-heading">Your Profile</div>
        <div className="EditProfile-profile">
          <p><strong>Nickname:</strong> {profile.nickname}</p>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Created At:</strong> {profile.created_at}</p>
          <p><strong>Updated At:</strong> {profile.updated_at}</p>
          <p><strong>Location:</strong> {user_metadata.location || 'unknown'}</p>
        </div>
        <div className="EditProfile-heading">Edit Profile</div>
        <form className="EditProfile-form" onSubmit={this.onSubmit}>
          <fieldset className="EditProfile-fieldset" disabled={saving}>
            <label className="EditProfile-locationLabel" htmlFor="location">Location</label>
            <input
              ref={(ref) => this.locationInput = ref}
              className="EditProfile-locationInput"
              id="location"
              type="text"
              placeholder="City or State"
              defaultValue={user_metadata.location}
            />
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

  onSubmit = (event) => {
    event.preventDefault();
    this.props.updateProfile(this.props.profile.user_id, this.props.idToken, {
      user_metadata: {
        location: this.locationInput.value
      }
    });
  }
}

export default EditProfile;
