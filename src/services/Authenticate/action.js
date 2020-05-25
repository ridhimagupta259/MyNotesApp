import {AUTHENTICATE_DATA, CREATE_DATA} from './constants';
import config from '../../config/env';

export const authenticateApi = (username, password, callback) => dispatch => {
  let loginAPI = config.apiConfig.authenticationApi.loginUserApi;
  fetch(loginAPI, {
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
        console.log(responseJson.id);
        dispatch({
          type: AUTHENTICATE_DATA,
          data: responseJson.id,
        });
      }
    });
};

export const createApi = (
  username,
  password,
  name,
  phonenumber,
  callback,
) => dispatch => {
  let createUser = config.apiConfig.createApi.createUserApi;
  fetch(createUser, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
      name: name,
      phonenumber: phonenumber,
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
          type: CREATE_DATA,
        });
      }
    });
};
