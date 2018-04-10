export const REDIRECT_NEXTPATH = 'REDIRECT_NEXTPATH';
export const LOGOUT = 'LOGOUT';
export const NEXT_PATH = 'NEXT_PATH';
export const AUTHENTICATED = 'AUTHENTICATED';

import { browserHistory } from 'react-router';

export const authenticate = (authenticatdUser) =>  {
  return {type: AUTHENTICATED, idToken: authenticatdUser.idToken,
    accessToken: authenticatdUser.accessToken};
};

export const setNextPath = (path) => (
  {
    type: NEXT_PATH,
    path
  }
);

export const logout = () => {
  browserHistory.push('/');
  return {
    type: LOGOUT
  };
};

export const redirectTo = (nextPath) => {
  browserHistory.push(nextPath);
  return {
    type: REDIRECT_NEXTPATH
  };
};