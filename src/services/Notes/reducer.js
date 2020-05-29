import {
  ADD_DATA,
  PERSONAL_COUNTER,
  WORK_COUNTER,
  IDEAS_COUNTER,
  LIST_COUNTER,
  DISPLAY_DATA,
  COUNTER,
} from './constants';

const initialState = {
  personalCount: 0,
  workCount: 0,
  ideasCount: 0,
  listCount: 0,
  userData: [],
};

const notesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_DATA:
      return state;
    case PERSONAL_COUNTER:
      return {
        ...state,
        personalCount: state.personalCount + 1,
      };
    case WORK_COUNTER:
      return {
        ...state,
        workCount: state.workCount + 1,
      };
    case LIST_COUNTER:
      return {
        ...state,
        listCount: state.listCount + 1,
      };
    case IDEAS_COUNTER:
      return {
        ...state,
        ideasCount: state.ideasCount + 1,
      };
    case DISPLAY_DATA:
      return {
        ...state,
        userData: action.data,
      };
    case COUNTER:
      return {
        ...state,
        personalCount: action.data.pc,
        workCount: action.data.wc,
        ideasCount: action.data.ic,
        listCount: action.data.lc,
      };
    default:
      return state;
  }
};

export default notesReducer;
