import { connect } from 'react-redux'
import EditProfile from '../components/EditProfile';
import {updateProfile} from '../actions'

const mapStateToProps = (state) => {
  return {
    accessToken: state.login.access_token,
    profile: state.profile
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (userId, newProfile) => {
      dispatch(updateProfile(userId, newProfile));
    }
  }
};

const SiteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);

export default SiteContainer