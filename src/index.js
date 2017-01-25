import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root'
import './index.css';
import configureStore  from './store'
import authApp from './reducers';

configureStore(authApp).then((store) => {
  ReactDOM.render(
    <Root store={store} lock="" />,
    document.getElementById('root')
  );
});


