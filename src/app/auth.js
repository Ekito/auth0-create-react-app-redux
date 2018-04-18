import { setNextPath } from '../login/actions';

export const LOGIN_PATH = '/login';

export const authRequired = store => (nextState, replace) => {
  // Now you can access the store object here.
  const state = store.getState();

  if (state.login.ready && !state.login.loggedIn) {
    store.dispatch(setNextPath(nextState.location.pathname));
    replace({ pathname: LOGIN_PATH });
  }
};
