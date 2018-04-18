import Loadable from 'react-loadable';
import React, { Component } from 'react'

class Loading extends Component {
  render() {
    return (
      <div>Loading ...</div>
    );
  }
}
// eslint-disable
const LoadableComponent = Loadable({
    loader: () => {
      return import('./containers') //eslint-
    },
    loading: Loading
  })
;

class LoadableLogin extends React.Component {
  render() {
    return <LoadableComponent {...this.props}/>;
  }
}

export default LoadableLogin;
