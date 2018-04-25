import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Site from '../containers';

const getRoutes = store => (
  <Route path="/" component={Site} store={store} />
);

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      { getRoutes(store) }
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Root;
