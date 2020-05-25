import {PERSONAL, WORK, IDEAS, LISTS} from './constants';
export function selectedType(category) {
  return dispatch => {
    switch (category) {
      case 'Personal':
        dispatch({type: PERSONAL});
        break;

      case 'Ideas': {
        dispatch({type: IDEAS});
        break;
      }
      case 'Work':
        dispatch({type: WORK});
        break;
      case 'Lists':
        dispatch({type: LISTS});
        break;
    }
  };
}
