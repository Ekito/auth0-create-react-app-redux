import { connect } from 'react-redux'
import Site from '../components/Site';
import { logout, fetchProfile, redirectTo } from '../actions/login';

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.loggedIn,
    nextPath: state.login.nextPath,
    shouldRedirect: state.login.shouldRedirect,
    accessToken: state.login.access_token,
    profile: state.profile
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: (id) => {
      dispatch(logout(id))
    },
    fetchProfile: (accessToken) => {
      dispatch(fetchProfile(accessToken));
    },
    redirectTo: (nextPath) => {
      dispatch(redirectTo(nextPath));
    }
  }
};

const SiteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Site);

export default SiteContainer