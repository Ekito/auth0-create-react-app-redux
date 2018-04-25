import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Site from './app/containers';
import './app/components/index.css';
import configureStore from './app/store';
import authApp from './app/reducers';
import registerServiceWorker from './registerServiceWorker';

/* eslint-disable react/jsx-filename-extension */
configureStore(authApp).then((store) => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Route path="/" component={Site} store={store} />
      </Router>
    </Provider>,
    document.getElementById('root'),
  );
});

registerServiceWorker();

