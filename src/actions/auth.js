import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { setError } from './app';
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
  };
}

export function signInUser(authInfo) {
  return (dispatch) => {
    axios
      .post(`${api}/signIn`, authInfo)
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER });
        storeData(response.data.token);
      })
      .catch((error) => {
        dispatch(setError(`Sign In Failed: ${error.response.data}`));
      });
  };
}

export function signUpUser(authInfo) {
  return (dispatch) => {
    axios
      .post(`${api}/signUp`, authInfo)
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER });
        storeData(response.data.token);
      })
      .catch((error) => {
        dispatch(setError(`Sign In Failed: ${error.response.data.error}`));
      });
  };
}
