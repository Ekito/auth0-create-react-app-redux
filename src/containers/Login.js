import { connect } from 'react-redux'
import Login from '../components/Login'

import {authenticate, nextPath, redirectTo} from '../actions/login';

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    nextPath: state.login.nextPath
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: (authenticatedUser) => {
      dispatch(authenticate(authenticatedUser));
    },
    setNextPath: (path) => {
      dispatch(nextPath(path));
    },
    redirectTo: (path) =>  {
      dispatch(redirectTo(path));
    }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
