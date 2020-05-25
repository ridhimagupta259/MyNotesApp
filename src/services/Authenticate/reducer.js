import {AUTHENTICATE_DATA, CREATE_DATA} from './constants';
const initialState = {
  id: '',
};
const authenticateReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case AUTHENTICATE_DATA:
      return {...state, id: action.data};
    case CREATE_DATA:
      return state;
    default:
      return state;
  }
};
export default authenticateReducer;
