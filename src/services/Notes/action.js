import {
  PERSONAL,
  WORK,
  IDEAS,
  LISTS,
  ADD_DATA,
  PERSONAL_COUNTER,
  WORK_COUNTER,
  LIST_COUNTER,
  IDEAS_COUNTER,
} from './constants';
import config from '../../config/env';

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
          Type: ADD_DATA,
        });
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
      case 'Lists':
        dispatch({type: LIST_COUNTER});
        break;
    }
  };
}
