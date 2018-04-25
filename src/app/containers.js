import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Site from './components/Site';
import { logout } from '../login/actions';
import { fetchProfile } from '../profile/actions';


const mapStateToProps = state => ({
  login: state.login,
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => {
    dispatch(logout());
  },
  fetchProfile: (accessToken) => {
    dispatch(fetchProfile(accessToken));
  },
});

const SiteContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Site));

export default SiteContainer;
