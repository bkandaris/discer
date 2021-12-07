import { REGISTER_USER, LOGIN_USER, UPDATE_USER } from './actionTypes';

export const registerUser = (payload) => ({
  type: REGISTER_USER,
  payload,
});

export const loginUser = (payload) => ({
  type: LOGIN_USER,
  payload,
});

export const updateUser = (payload) => ({
  type: LOGIN_USER,
  payload,
});
