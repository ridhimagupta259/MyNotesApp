import {
  ADD_DATA,
  PERSONAL_COUNTER,
  WORK_COUNTER,
  LIST_COUNTER,
  IDEAS_COUNTER,
  DISPLAY_DATA,
  COUNTER,
  DELETE_DATA,
  DELETE_IDEAS,
  DELETE_LIST,
  DELETE_PERSONAL,
  DELETE_WORK,
} from './constants';
import config from '../../config/env';

export const addNote = (title, data, id) => dispatch => {
  let createNotesApi = config.apiConfig.createApi.createNotes;
  console.log(createNotesApi + id);
  fetch(createNotesApi + id, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      notes: [
        {
          title: title,
          data: data,
        },
      ],
    }),
  })
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      console.log(responseJson);
      if (responseJson.status === false) {
        console.log('Cannot enter data');
      } else {
        dispatch({
          type: ADD_DATA,
        });
        dispatch(displayuserNotes(id));
      }
    });
};

export function update(title) {
  return dispatch => {
    switch (title) {
      case 'Personal':
        dispatch({type: PERSONAL_COUNTER});
        break;

      case 'Ideas': {
        dispatch({type: IDEAS_COUNTER});
        break;
      }
      case 'Work':
        dispatch({type: WORK_COUNTER});
        break;
      case 'List':
        dispatch({type: LIST_COUNTER});
        break;
    }
  };
}

export const displayuserNotes = id => dispatch => {
  let createNotesApi = config.apiConfig.createApi.createNotes;
  console.log(createNotesApi + id);
  fetch(createNotesApi + id, {
    method: 'GET',
  })
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      console.log(responseJson.response);
      if (responseJson.status === false) {
        console.log('Cannot display data');
      } else {
        console.log('data displayed');
        dispatch({
          type: DISPLAY_DATA,
          data: responseJson.response,
        });
      }
    });
};

export function countCategory(data) {
  return dispatch => {
    console.log('123');
    let count = {pc: 0, wc: 0, ic: 0, lc: 0};
    console.log(data);

    data.forEach(item => {
      switch (item.title) {
        case 'Personal':
          count.pc++;
          break;
        case 'Work':
          count.wc++;
          break;
        case 'Ideas':
          count.ic++;
          break;
        case 'List':
          count.lc++;
          break;
        default:
          break;
      }
    });
    dispatch({type: COUNTER, data: count});
  };
}

export const deleteNotes = (id, notesid, title) => dispatch => {
  let deletenotesApi = config.apiConfig.deleteApi.deleteNotes;
  console.log(deletenotesApi + id + '/' + notesid);
  fetch(deletenotesApi + id + '/' + notesid, {
    method: 'DELETE',
  })
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      console.log(responseJson);
      if (responseJson.status === false) {
        console.log('Cannot delete data');
      } else {
        console.log('deleted');
        dispatch({
          type: DELETE_DATA,
        });
        dispatch(displayuserNotes(id));
        dispatch(deleteUpdate(title));
      }
    });
};

export function deleteUpdate(title) {
  return dispatch => {
    switch (title) {
      case 'Personal':
        dispatch({type: DELETE_PERSONAL});
        break;

      case 'Ideas': {
        dispatch({type: DELETE_IDEAS});
        break;
      }
      case 'Work':
        dispatch({type: DELETE_WORK});
        break;
      case 'List':
        dispatch({type: DELETE_LIST});
        break;
    }
  };
}
