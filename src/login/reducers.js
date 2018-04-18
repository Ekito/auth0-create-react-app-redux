import { LOAD } from 'redux-storage';
import { AUTHENTICATED, LOGOUT, NEXT_PATH, REDIRECT_NEXTPATH } from '../login/actions';

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

const reducers = (state = {
  loggedIn: false,
  ready: false,
  shouldRedirect: false,
  [ACCESS_TOKEN_KEY]: null,
}, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return Object.assign(
        {}, state,
        {
          loggedIn: true,
          [ID_TOKEN_KEY]: action.idToken,
          [ACCESS_TOKEN_KEY]: action.accessToken,
        },
      );
    case LOGOUT:
      return Object.assign(
        {}, state,
        {
          loggedIn: false,
          [ID_TOKEN_KEY]: undefined,
          [ACCESS_TOKEN_KEY]: undefined,
        },
      );
    case NEXT_PATH:
      return Object.assign({}, state, { nextPath: action.path, shouldRedirect: true });
    case REDIRECT_NEXTPATH:
      return Object.assign({}, state, { nextPath: null, shouldRedirect: false });
    case LOAD:
      return Object.assign({}, state, { ready: true });
    default:
      return state;
  }
};

export default reducers;
