const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

import { LOAD } from 'redux-storage';

import {REDIRECT_NEXTPATH, NEXT_PATH, AUTHENTICATED, LOGOUT} from '../actions/login'

const todos = (state = {loggedIn: false, ready: false}, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return Object.assign({}, state,
        {
          loggedIn: true,
          [ID_TOKEN_KEY]: action.idToken,
          [ACCESS_TOKEN_KEY]: action.accessToken
        });
    case LOGOUT:
      return Object.assign({}, state,
        {
          loggedIn: false,
          [ID_TOKEN_KEY]: undefined,
          [ACCESS_TOKEN_KEY]: undefined
        });
    case NEXT_PATH:
      return Object.assign({}, state, {nextPath: action.path, shouldRedirect: true} );
    case REDIRECT_NEXTPATH:
      return Object.assign({}, state, {nextPath: null, shouldRedirect: false});
    case LOAD:
      return Object.assign({}, state, {ready: true});
    default:
      return state
  }
}

export default todos