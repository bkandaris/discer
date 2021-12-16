import {
  REGISTER_USER,
  LOGIN_USER,
  UPDATE_USER,
  FINISH_PROFILE,
} from './actionTypes';

const initialState = {
  username: null,
  _id: null,
  isAdmin: null,
  email: '',
  phone: null,
  skill: null,
  isLoggedIn: false,
  profilePicture: 'https://i.gyazo.com/ee20fb12aa6d4b721c8fccc5baed44f5.png',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER: {
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        phone: action.payload.phone,
        _id: action.payload._id,
        isLoggedIn: action.payload.isLoggedIn,
        profilePicture: action.payload.profilePicture,
      };
    }
    case LOGIN_USER: {
      return {
        ...state,
        username: action.payload.username,
        _id: action.payload._id,
        isLoggedIn: true,
        email: action.payload.email,
        skill: action.payload.skill,
        phone: action.payload.phone,
        profilePicture: action.payload.profilePicture,
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
    case FINISH_PROFILE: {
      return {
        ...state,
        profilePicture: action.payload.profilePicture,
        phone: action.payload.phone,
        skill: action.payload.skill,
      };
    }
    default:
      return state;
  }
};

export default reducer;
