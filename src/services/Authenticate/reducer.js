import {
  AUTHENTICATE_DATA,
  CREATE_DATA,
  TOGGLE_SPLASH,
  LOGIN_START,
  LOGIN_SUCCESS,
} from './constants';
const initialState = {
  id: '',
  loading: false,
};
const authenticateReducer = (state = initialState, action) => {
  console.log('action called', action);

  switch (action.type) {
    case AUTHENTICATE_DATA:
      return {...state, id: action.data, loading: false};
    case LOGIN_START: {
      return {...state, loading: true};
    }
    case CREATE_DATA:
      return {...state, id: action.data, loading: false};
    case TOGGLE_SPLASH:
      return {
        ...state,
        id: action.data,
      };
    // case LOGIN_SUCCESS:
    //   return {
    //     ...state,
    //     id: action.data,
    //   };
    default:
      return state;
  }
};
export default authenticateReducer;
