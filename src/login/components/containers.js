import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Login from './Login';
import { authenticate, redirectTo, setNextPath } from '../actions';

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
