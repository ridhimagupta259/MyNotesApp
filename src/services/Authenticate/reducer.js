import {AUTHENTICATE_DATA, CREATE_DATA, TOGGLE_SPLASH} from './constants';
const initialState = {
  id: '',
};
const authenticateReducer = (state = initialState, action) => {
  console.log('action called', action);

  switch (action.type) {
    case AUTHENTICATE_DATA:
      return {...state, id: action.data};
    case CREATE_DATA:
      return state;
    case TOGGLE_SPLASH:
      return {
        ...state,
        id: action.data,
      };
    default:
      return state;
  }
};
export default authenticateReducer;
