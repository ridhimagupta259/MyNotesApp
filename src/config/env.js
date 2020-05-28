const apiURL = 'https://nodejsapp20.herokuapp.com/api';

const apiConfig = {
  authenticationApi: {
    loginUserApi: `${apiURL}/authenticate/`,
  },
  createApi: {
    createUserApi: `${apiURL}/users/`,
    createNotes: `${apiURL}/notes/`,
  },
};

export default {
  apiConfig,
  apiURL,
};
