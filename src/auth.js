import decode from 'jwt-decode';
import {EventEmitter} from 'events';
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';

const NEXT_PATH_KEY = 'next_path';
const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';
const PROFILE_KEY = 'profile';
const LOGIN_ROUTE = '/login';
const ROOT_ROUTE = '/';


const events = new EventEmitter();


function setProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  events.emit('profile_updated', profile);
}

function getProfile() {
  return JSON.parse(localStorage.getItem(PROFILE_KEY));
}

function clearProfile() {
  localStorage.removeItem(PROFILE_KEY);
  events.emit('profile_updated', null);
}

function setIdToken(idToken) {
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

function setAccessToken(accessToken) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

function setNextPath(nextPath) {
  localStorage.setItem(NEXT_PATH_KEY, nextPath);
}

function getNextPath() {
  return localStorage.getItem(NEXT_PATH_KEY) || ROOT_ROUTE;
}

function clearNextPath() {
  localStorage.removeItem(NEXT_PATH_KEY);
}

function isLoggedIn() {
  const idToken = getIdToken();
  return idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}
