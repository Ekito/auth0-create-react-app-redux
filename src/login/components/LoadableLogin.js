import Loadable from 'react-loadable';
import React, { Component } from 'react'

class Loading extends Component {
  render() {
    return (
      <div>Loading ...</div>
    );
  }
}

const LoadableComponent = Loadable({
    loader: () => {
      return import('./containers')
    },
    loading: Loading
  })
;

export default class LoadableLogin extends React.Component {
  render() {
    return <LoadableComponent {...this.props}/>;
  }
}

