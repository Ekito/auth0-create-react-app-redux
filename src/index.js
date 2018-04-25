import React from 'react';
import ReactDOM from 'react-dom';
import './app/components/index.css';
import configureStore from './app/store';
import authApp from './app/reducers';
import registerServiceWorker from './registerServiceWorker';


import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Site from './app/containers';

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

