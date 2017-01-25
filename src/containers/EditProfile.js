import { connect } from 'react-redux'
import EditProfile from '../components/EditProfile';
import {updateProfile} from '../actions'

const mapStateToProps = (state) => {
  return {
    accessToken: state.login.access_token,
    idToken: state.login.id_token,
    profile: state.profile
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (userId, tokenId, newProfile) => {
      dispatch(updateProfile(userId, tokenId, newProfile));
    }
  }
};

const SiteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);

export default SiteContainer