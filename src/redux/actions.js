import { REGISTER_USER, LOGIN_USER, FINISH_PROFILE } from './actionTypes';

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

export const finishProfile = (payload) => ({
  type: FINISH_PROFILE,
  payload,
});
