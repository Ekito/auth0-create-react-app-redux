import { connect } from 'react-redux';
import Site from './components/Site';
import { logout, redirectTo } from '../login/actions';
import { fetchProfile } from '../profile/actions';

const mapStateToProps = state => ({
  loggedIn: state.login.loggedIn,
  nextPath: state.login.nextPath,
  shouldRedirect: state.login.shouldRedirect,
  accessToken: state.login.access_token,
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  onLogout: (id) => {
    dispatch(logout(id));
  },
  fetchProfile: (accessToken) => {
    dispatch(fetchProfile(accessToken));
  },
  redirectTo: (nextPath) => {
    dispatch(redirectTo(nextPath));
  },
});

const SiteContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Site);

export default SiteContainer;
