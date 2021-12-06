import { UPDATE_USER, PROFILE_UPDATE } from './actionTypes';

export const updateUser = (payload) => ({
  type: UPDATE_USER,
  payload,
});

export const profileUpdate = (payload) => ({
  type: PROFILE_UPDATE,
  payload,
});
