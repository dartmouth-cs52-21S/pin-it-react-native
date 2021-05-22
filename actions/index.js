import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

export const ROOT_URL = 'https://not-pin-it.herokuapp.com/api';
// export const ROOT_URL = 'http://localhost:9090/api';

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('token', value);
  } catch (e) {
    // saving error
  }
};

const deleteData = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (e) {
    // saving error
  }
};

export function signOutUser() {
  return (dispatch) => {
    deleteData();
    dispatch({ type: ActionTypes.DEAUTH_USER });
  };
}
// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signInUser({ email, password }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signIn`, { email, password })
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER });
        storeData(response.data.token);
      })
      .catch((error) => {
        dispatch(authError(`Sign In Failed: ${error.response.data}`));
      });
  };
}

export function signUpUser({ email, password, username }) {
  console.log('here');
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signUp`, { email, password, username })
      .then((response) => {
        console.log('test');
        dispatch({ type: ActionTypes.AUTH_USER });
        storeData(response.data.token);
      })
      .catch((error) => {
        console.log('123');
        dispatch(authError(`Sign In Failed: ${error.response.data.error}`));
      });
  };
}
