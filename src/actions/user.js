import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { setError } from './app';
import config from '../../app-config';

const { api } = config;

export const ActionTypes = {
  GET_USER: 'GET_USER',
  GET_TOP_USERS: 'GET_TOP_USERS',
  GET_USER_RANK_INFO: 'GET_USER_RANK_INFO',
};

export const getUser = () => async (dispatch) => {
  const token = await AsyncStorage.getItem('token');
  return new Promise((resolve, reject) => {
    axios
      .get(`${api}/user`, { headers: { authorization: token } })
      .then((response) => {
        dispatch({ type: ActionTypes.GET_USER, payload: response.data });
        resolve(response.data._id);
      })
      .catch((error) => {
        dispatch(setError(`Getting user failed: ${error.response.data}`));
        reject();
      });
  });
};

export const editUser = (userdata) => async (dispatch) => {
  const token = await AsyncStorage.getItem('token');
  axios
    .put(`${api}/user`, userdata, { headers: { authorization: token } })
    .then((response) => {
      dispatch({ type: ActionTypes.GET_USER, payload: response.data });
      getUser();
    })
    .catch((error) => {
      dispatch(setError(`Posting failed: ${error.response.data}`));
    });
};

export const deletePost = (id) => async (dispatch) => {
  const token = await AsyncStorage.getItem('token');
  axios
    .delete(`${api}/post/${id}`, { headers: { authorization: token } })
    .then((response) => {
    })
    .catch((error) => {
      dispatch(setError(`Deleting failed: ${error.response.data}`));
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

// Get user rank info by userId
export const getUserRankInfo = (userId) => async (dispatch) => {
  axios.get(`${api}/userrankinfo/${userId}`)
    .then((response) => {
      dispatch({ type: ActionTypes.GET_USER_RANK_INFO, payload: response.data[0] });
    })
    .catch((error) => {
      dispatch(setError(`Getting user rnak info failed: ${error.response.data}`));
    });
};
