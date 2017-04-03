import { connect } from 'react-redux'
import Login from '../components/Login'

import {authenticate, setNextPath, redirectTo} from '../actions/login';
import { bindActionCreators } from 'redux'

export const LOGIN_PATH = '/login';

const mapStateToProps = (state, ownProps) => {
  return {
    currentPath: ownProps.route.path,
    nextPath: state.login.nextPath
  }
}


const mapDispatchToProps = (dispatch) => {
  return { actions : bindActionCreators({authenticate, setNextPath, redirectTo}, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

export const authRequired = (store) => (nextState, replace) => {
  // Now you can access the store object here.
  const state = store.getState();

  if (state.login.ready && !state.login.loggedIn) {
    store.dispatch(setNextPath(nextState.location.pathname));
    replace({pathname: LOGIN_PATH});
  }
};