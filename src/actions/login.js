export const REDIRECT_NEXTPATH = 'REDIRECT_NEXTPATH';
export const LOGOUT = 'LOGOUT';
export const NEXT_PATH = 'NEXT_PATH';

export const AUTHENTICATED = 'AUTHENTICATED';

import { browserHistory } from 'react-router';

export const authenticate = (authenticatdUser) =>  {
  return dispatch => dispatch({type: AUTHENTICATED, idToken: authenticatdUser.idToken,
    accessToken: authenticatdUser.accessToken});
};

export const nextPath = (path) => (
  {
    type: NEXT_PATH,
    path
  }
);

export const logout = () => {
  return dispatch => {
    dispatch({type: LOGOUT});
    browserHistory.push('/');
  };
};

export const redirectTo = (nextPath) => {
  return dispatch => {
    dispatch({type: REDIRECT_NEXTPATH});
    browserHistory.push(nextPath);
  };
};