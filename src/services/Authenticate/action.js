import {
  AUTHENTICATE_DATA,
  CREATE_DATA,
  TOGGLE_SPLASH,
  LOGIN_START,
  LOGIN_SUCCESS,
} from './constants';
import config from '../../config/env';

export const authenticateApi = (username, password, callback) => dispatch => {
  let loginAPI = config.apiConfig.authenticationApi.loginUserApi;
  dispatch({
    type: LOGIN_START,
  });
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
  dispatch({
    type: LOGIN_START,
  });
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
      phoneNumber: phonenumber,
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

export const toggleSplash = value => dispatch => {
  dispatch({
    type: TOGGLE_SPLASH,
    data: value,
  });
};

// export const initUser = userinfo => dispatch => {
//   console.warn(userinfo);
//   let signUpUrl = config.apiConfig.createApi.createUser;
//   dispatch({
//     type: LOGIN_START,
//   });
//   fetch(signUpUrl, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'content-type': 'application/json',
//     },
//     body: JSON.stringify({
//       username: userinfo.name,
//       password: '',
//       email: userinfo.email,
//       socialId: userinfo.id,
//     }),
//   })
//     .then(response => response.json())
//     .then(responseJson => {
//       if (responseJson.status === true) {
//         dispatch({
//           type: LOGIN_SUCCESS,
//           data: [responseJson.body, userinfo],
//         });
//       }
//     });
// };
