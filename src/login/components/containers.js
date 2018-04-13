import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Login from './Login';
import { authenticate, redirectTo, setNextPath } from '../actions';

export const LOGIN_PATH = '/login';

const mapStateToProps = (state, ownProps) => ({
  currentPath: ownProps.route.path,
  nextPath: state.login.nextPath,
});


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    authenticate,
    setNextPath,
    redirectTo,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

export const authRequired = store => (nextState, replace) => {
  // Now you can access the store object here.
  const state = store.getState();

  if (state.login.ready && !state.login.loggedIn) {
    store.dispatch(setNextPath(nextState.location.pathname));
    replace({ pathname: LOGIN_PATH });
  }
};
