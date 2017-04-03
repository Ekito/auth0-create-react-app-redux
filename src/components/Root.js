import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import Site from "../containers/Site";
import Home from "./Home";
import Login, {authRequired} from "../containers/Login";
import EditProfile from "../containers/EditProfile";

const getRoutes = (store) => {
  return (
    <Route component={Site}>
      <Route path="/" component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/login/callback" component={Login}/>
      <Route onEnter={authRequired(store)}>
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
