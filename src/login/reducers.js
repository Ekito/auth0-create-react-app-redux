import { LOAD } from 'redux-storage';
import { AUTHENTICATED, LOGOUT, AUTHENTICATING } from '../login/actions';

const ID_TOKEN_KEY = 'idToken';
const ACCESS_TOKEN_KEY = 'accessToken';

const reducers = (state = {
  loggedIn: false,
  ready: false,
  shouldRedirect: false,
  redirectToReferrer: false,
  [ACCESS_TOKEN_KEY]: null,
}, action) => {
  switch (action.type) {
    case AUTHENTICATING:
      return Object.assign(
        {}, state,
        {
          loggedIn: false,
          from: action.from,
          redirectToReferrer: false,
        },
      );
    case AUTHENTICATED:
      return Object.assign(
        {}, state,
        {
          loggedIn: true,
          [ID_TOKEN_KEY]: action.idToken,
          [ACCESS_TOKEN_KEY]: action.accessToken,
          redirectToReferrer: true,
        },
      );
    case LOGOUT:
      return Object.assign(
        {}, state,
        {
          loggedIn: false,
          redirectToReferrer: false,
          [ID_TOKEN_KEY]: undefined,
          [ACCESS_TOKEN_KEY]: undefined,
        },
      );
    case LOAD:
      return Object.assign({}, state, { ready: true });
    default:
      return state;
  }
};

export default reducers;
