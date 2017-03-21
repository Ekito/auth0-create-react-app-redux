

export const REQUEST_PROFILE = 'REQUEST_PROFILE';
export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';
export const UPDATING_PROFILE = 'UPDATING_PROFILE';
export const UPDATE_PROFILE_ERROR = 'UPDATE_PROFILE_ERROR';
export const RECEIVE_PROFILE_UPDATE = 'RECEIVE_PROFILE_UPDATE';

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
    if (!response.ok) { return response.json().then((json) => ({response, json}))}
    return {response};
  }).then(value => {
    const {response, json} = value;
    if (!response.ok) {throw new Error(json.message)}
    return response;
  });
}

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

export const updateProfile = (userId, accessToken, newProfile) => {
  return dispatch => {
    dispatch(updatingProfile());
    return fetchAsUser(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(newProfile),
      accessToken: accessToken
    }).then(response => response.json())
      .then(profile => dispatch(receiveProfileUpdate(profile)))
      .catch(error => {
        return dispatch({type: 'UPDATE_PROFILE_ERROR', error});
      });
  }
};

const requestProfile = () => {
  console.log('requestProfile');
  return {
    type: REQUEST_PROFILE
  }
};

const receiveProfile = (profile) =>  {
  console.log('receiveProfile', profile);
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