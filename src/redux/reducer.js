import { ACTION_TYPE } from './actionTypes';

const initialState = {
  num: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE: {
      return { ...state, num: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
