import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { setError } from './app';
import config from '../../app-config';

const { api } = config;

export const ActionTypes = {
  GET_USER: 'GET_USER',
  GET_TOP_USERS: 'GET_TOP_USERS',
};

export const getUser = () => async (dispatch) => {
  const token = await AsyncStorage.getItem('token');
  axios
    .get(`${api}/user`, { headers: { authorization: token } })
    .then((response) => {
      dispatch({ type: ActionTypes.GET_USER, payload: response.data });
    })
    .catch((error) => {
      dispatch(setError(`Getting user failed: ${error.response.data}`));
    });
};

// Get users with the highest number of completed missions
export const getTopUsers = () => async (dispatch) => {
  axios.get(`${api}/topusers`)
    .then((response) => {
      dispatch({ type: ActionTypes.GET_TOP_USERS, payload: response.data });
    })
    .catch((error) => {
      dispatch(setError(`Getting top users failed: ${error.response.data}`));
    });
};
