import { connect } from 'react-redux';
import EditProfile from './components/EditProfile';
import { updateProfile } from './actions';

const mapStateToProps = state => ({
  accessToken: state.login.access_token,
  idToken: state.login.id_token,
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  updateProfile: updateProfile(dispatch),
});

const SiteContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfile);

export default SiteContainer;
