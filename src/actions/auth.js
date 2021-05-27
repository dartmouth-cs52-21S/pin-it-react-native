import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { displayToast } from './app';
import config from '../../app-config';

const { api } = config;

export const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

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
    displayToast('success', 'Successfully signed out');
  };
}

export function signInUser(authInfo) {
  return (dispatch) => {
    axios
      .post(`${api}/signin`, authInfo)
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER });
        storeData(response.data.token);
        displayToast('success', 'Successfully signed in');
      })
      .catch((error) => {
        displayToast('error', 'Sign in failed', 'Username or password is incorrect');
      });
  };
}

export function signUpUser(authInfo) {
  return (dispatch) => {
    axios
      .post(`${api}/signup`, authInfo)
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER });
        storeData(response.data.token);
        displayToast('success', 'Successfully signed up');
      })
      .catch((error) => {
        displayToast('error', 'Sign up failed', error.response.data.error);
      });
  };
}
