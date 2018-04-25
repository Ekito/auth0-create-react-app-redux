import Loadable from 'react-loadable';
import React from 'react';

const Loading = () => (<div>Loading ...</div>);

// eslint-disable
const LoadableComponent = Loadable({
  loader: () =>
       import('./containers'), // eslint-
  loading: Loading,
});

const LoadableLogin = props => (<LoadableComponent {...props} />);

export default LoadableLogin;
