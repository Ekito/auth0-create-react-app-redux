import React from 'react';
import ReactDOM from 'react-dom';
import Root from './app/components/Root'
import './app/components/index.css';
import configureStore  from './app/store'
import authApp from './app/reducers';

configureStore(authApp).then((store) => {
  ReactDOM.render(
    <Root store={store} lock="" />,
    document.getElementById('root')
  );
});


