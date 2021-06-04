import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { setError } from './app';
import config from '../../app-config';

const { api } = config;

export const ActionTypes = {
  GET_USER: 'GET_USER',
};

export const getUser = () => async (dispatch) => {
  const token = await AsyncStorage.getItem('token');
  axios
    .get(`${api}/user`, { headers: { authorization: token } })
    .then((response) => {
      dispatch({ type: ActionTypes.GET_USER, payload: response.data });
    })
    .catch((error) => {
      dispatch(setError(`Posting failed: ${error.response.data}`));
    });
};

export const editUser = (userdata) => async (dispatch) => {
  const token = await AsyncStorage.getItem('token');
  axios
    .put(`${api}/user`, userdata, { headers: { authorization: token } })
    .then((response) => {
      dispatch({ type: ActionTypes.GET_USER, payload: response.data });
    })
    .catch((error) => {
      dispatch(setError(`Posting failed: ${error.response.data}`));
    });
};
