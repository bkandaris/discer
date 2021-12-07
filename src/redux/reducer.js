import { REGISTER_USER, LOGIN_USER, UPDATE_USER } from './actionTypes';

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
    case REGISTER_USER: {
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        _id: action.payload._id,
        isLoggedIn: action.payload.isLoggedIn,
      };
    }
    case LOGIN_USER: {
      return {
        username: action.payload.username,
        _id: action.payload._id,
        isLoggedIn: true,
        email: action.payload.email,
        skill: action.payload.skill,
        phone: action.payload.phone,
      };
    }
    case UPDATE_USER: {
      return {
        ...state,
        email: action.payload.email,
        skill: action.payload.skill,
        phone: action.payload.phone,
      };
    }
    default:
      return state;
  }
};

export default reducer;
