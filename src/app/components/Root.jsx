import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import Site from '../containers';
import Home from './Home';
import { authRequired } from '../../app/auth';
import EditProfile from '../../profile/containers';
import LoadableLogin from '../../login/components/LoadableLogin';
//import Login from '../../login/components/containers';

const getRoutes = store => (
  <Route component={Site}>
    <Route path="/" component={Home} />
    <Route path="/login" component={LoadableLogin} />
    <Route path="/login/callback" component={LoadableLogin} />
    <Route onEnter={authRequired(store)}>
      {/* Place all authenticated routes here */}
      <Route path="/profile/edit" component={EditProfile} />
    </Route>
  </Route>
);

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      { getRoutes(store) }
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Root;
