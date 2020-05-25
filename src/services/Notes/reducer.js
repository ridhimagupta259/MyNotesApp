import {PERSONAL, WORK, IDEAS, LISTS} from './constants';

const initialState = {
  personalCount: 0,
  workCount: 0,
  ideasCount: 0,
  listCount: 0,
};

const notesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case PERSONAL:
      return state;
    case IDEAS:
      return state;
    case WORK:
      return state;
    case LISTS:
      return state;
    default:
      return state;
  }
};

export default notesReducer;
