import {AUTHENTICATE_DATA, CREATE_DATA, TOGGLE_SPLASH} from './constants';
import config from '../../config/env';
import AsyncStorage from 'react-native';

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
        console.log(responseJson.id);
        //var temp = responseJson.id;
        dispatch({
          type: AUTHENTICATE_DATA,
          data: responseJson.id,
        });
        callback && callback(true, responseJson, null);
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
        console.log('true');
        console.log(responseJson.body.id);
        dispatch({
          type: CREATE_DATA,
          data: responseJson.body.id,
        });
        callback && callback(true, responseJson, null);
      }
    });
};

export const toggleSplash = () => async dispatch => {
  try {
    const value = await AsyncStorage.getItem('token');
    console.log(value);
    if (value !== null) {
      console.log('togglesplash');
      dispatch({
        type: TOGGLE_SPLASH,
        data: value,
      });
    }
    if (value === null) {
      dispatch({
        type: TOGGLE_SPLASH,
        data: '',
      });
    }
  } catch (error) {
    console.log('error in getting token', error);
  }
};
