export const LOGOUT = 'LOGOUT';
export const AUTHENTICATED = 'AUTHENTICATED';
export const AUTHENTICATING = 'AUTHENTICATING';

export const authenticate = authenticatdUser => ({
  type: AUTHENTICATED,
  ...authenticatdUser,
});

export const authenticating = from => ({
  type: AUTHENTICATING,
  from,
});

export const logout = () => ({
  type: LOGOUT,
});
