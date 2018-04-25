import { connect } from 'react-redux';

import Login from './Login';
import { authenticate, authenticating } from '../actions';


const mapStateToProps = state => ({
  login: state.login,
  redirectToReferrer: state.login.redirectToReferrer,
});

const mapDispatchToProps = dispatch => ({
  authenticating: (from) => {
    dispatch(authenticating(from));
  },
  authenticate: (authenticatdUser) => {
    dispatch(authenticate(authenticatdUser));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
