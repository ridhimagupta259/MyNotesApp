const apiURL = 'https://nodejsapp20.herokuapp.com/api';

const apiConfig = {
  authenticationApi: {
    loginUserApi: `${apiURL}/authenticate/`,
  },
  createApi: {
    createUserApi: `${apiURL}/users/`,
  },
};

export default {
  apiConfig,
  apiURL,
};
