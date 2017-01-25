/*
function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(`http://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}
*/

export const REDIRECT_NEXTPATH = 'REDIRECT_NEXTPATH';
export const LOGOUT = 'LOGOUT';
export const NEXT_PATH = 'NEXT_PATH';

export const REQUEST_PROFILE = 'REQUEST_PROFILE';
export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';
export const UPDATING_PROFILE = 'UPDATING_PROFILE';
export const UPDATE_PROFILE_ERROR = 'UPDATE_PROFILE_ERROR';
export const RECEIVE_PROFILE_UPDATE = 'RECEIVE_PROFILE_UPDATE';

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

export function fetchAsUser(input, init={}) {
  const headers = init.headers || {};

  return fetch(input, {
    ...init,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${init.accessToken}`,
      ...headers
    }
  }).then((response) => {
    if (!response.ok) { throw new Error(response); }
    return response;
  });
}

export const updateProfile = (userId, newProfile) => {
  return dispatch => {
      dispatch(updateProfile());
      return fetchAsUser(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify(newProfile)
      }).then(response => response.json())
        .then(profile => dispatch(receiveProfileUpdate(profile)))
        .catch(error => dispatch({type: 'UPDATE_PROFILE_ERROR', error}));
  }
};

export const logout = () => {
  return dispatch => {
    dispatch({type: LOGOUT});
    browserHistory.push('/');
  };
};

const requestProfile = () => {
  return {
    type: REQUEST_PROFILE
  }
};

const updatingProfile = () => {
  return {
    type: UPDATING_PROFILE,
    saving: true,
    saved: false
  }
};

const receiveProfileUpdate = (profile) => {
  return {
    type: RECEIVE_PROFILE_UPDATE,
    profile,
    saving: false,
    saved: true
  }
};

const receiveProfile = (profile) =>  {
  return {
    type: RECEIVE_PROFILE,
    profile
  }
};

export const fetchProfile =  (accessToken) => {
  return dispatch => {
    dispatch(requestProfile());
    return fetchAsUser(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`, {accessToken})
      .then(response => response.json())
      .then(json => dispatch(receiveProfile(json)));
  }
};

export const redirectTo = (nextPath) => {
  return dispatch => {
    dispatch({type: REDIRECT_NEXTPATH});
    browserHistory.push(nextPath);
  };
};