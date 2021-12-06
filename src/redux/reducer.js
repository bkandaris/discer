import { UPDATE_USER, PROFILE_UPDATE } from './actionTypes';

const initialState = {
  username: null,
  _id: null,
  isAdmin: null,
  email: null,
  phone: null,
  profilePicture: null,
  skill: null,
  isLoggedIn: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER: {
      return {
        ...state,
        _id: action.payload._id,
        username: action.payload.username,
        isLoggedIn: true,
      };
    }
    case PROFILE_UPDATE: {
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        phone: action.payload.phone,
        profilePicture: action.payload.profilePicture,
        skill: action.payload.skill,
      };
    }
    default:
      return state;
  }
};

export default reducer;
