import {AUTHENTICATE_DATA} from './constants';
export const authenticateApi = (username, password, callback) => dispatch => {
  fetch('https://nodejsapp20.herokuapp.com/api/authenticate', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      console.log(responseJson);
      if (responseJson.status === false) {
        callback && callback(false, responseJson, null);
      } else {
        callback && callback(true, responseJson, null);
        console.log('true');
        dispatch({
          type: AUTHENTICATE_DATA,
        });
      }
    });
};
