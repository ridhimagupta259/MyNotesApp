import {AUTHENTICATE_DATA} from './constants';
const initialState = {};
const authenticateReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case AUTHENTICATE_DATA:
      return state;
    default:
      return state;
  }
};
export default authenticateReducer;
