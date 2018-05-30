import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";

class PrivateRouteComponent extends Route {

  render() {
    const Component = this.props.component;
    const mergedPropsAfterMatch = Object.assign({}, this.props, {match: this.state.match});
    console.log(mergedPropsAfterMatch);
    return this.props.login.loggedIn ? <Component {...mergedPropsAfterMatch} /> : <Redirect
      to={{
        pathname: '/login',
        state: { from: this.props.location.pathname },
      }}
    />;
  }
}

const mapStateToProps = state => ({
  login: state.login,
});

export const PrivateRoute = withRouter(connect(
  mapStateToProps,
)(PrivateRouteComponent));
