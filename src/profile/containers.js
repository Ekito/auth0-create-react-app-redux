import { connect } from 'react-redux';
import EditProfile from './components/EditProfile';
import { updateProfile } from './actions';

const mapStateToProps = state => ({
  accessToken: state.login.accessToken,
  idToken: state.login.idToken,
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
