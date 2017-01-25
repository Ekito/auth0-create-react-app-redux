import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import Site from "../containers/Site";
import Home from "./Home";
import Login from "../containers/Login";
import EditProfile from "../containers/EditProfile";
import {nextPath} from '../actions';

export const LOGIN_PATH = '/login';

const getRoutes = (store) => {
  const authRequired = (nextState, replace) => {
    // Now you can access the store object here.
    const state = store.getState();

    if (state.login.ready && !state.login.loggedIn) {
      console.log('set next path in authRequired', nextState.location.pathname);
      store.dispatch(nextPath(nextState.location.pathname));
      replace({pathname: LOGIN_PATH});
    }
  };

  return (
    <Route component={Site}>
      <Route path="/" component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/login/callback" component={Login}/>
      <Route onEnter={authRequired}>
        {/* Place all authenticated routes here */}
        <Route path="/profile/edit" component={EditProfile}/>
      </Route>
    </Route>
  );
};

const Root = ({store}) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      { getRoutes(store) }
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
