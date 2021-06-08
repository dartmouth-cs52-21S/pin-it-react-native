import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setError } from './app';
import config from '../../app-config';

const { api } = config;

export const ActionTypes = {
  GET_MISSIONS: 'GET_MISSIONS',
  SET_MISSION: 'SET_MISSION',
  CLEAR_MISSION: 'CLEAR_MISSION',
  REMOVE_MISSION: 'REMOVE_MISSION',
};

export const setMission = (mission) => {
  return {
    type: ActionTypes.SET_MISSION,
    payload: mission,
  };
};

export const clearMission = () => {
  return {
    type: ActionTypes.CLEAR_MISSION,
  };
};

export const getMissions = () => {
  return (dispatch) => {
    AsyncStorage.getItem('token').then((token) => {
      return axios.get(`${api}/usermissions`, { headers: { authorization: token } });
    }).then((response) => {
      dispatch({ type: ActionTypes.GET_MISSIONS, payload: response.data });
    }).catch((error) => {
      dispatch(setError(`Fetching missions failed: ${error.response.data.error}`));
    });
  };
};

export const deleteMission = (missionId) => async (dispatch) => {
  try {
    const url = `${api}/missions/${missionId}`;
    const token = await AsyncStorage.getItem('token');
    await axios.delete(url, { headers: { authorization: token } });
    dispatch({ type: ActionTypes.REMOVE_MISSION, payload: missionId });
  } catch (error) {
    dispatch(setError(`Deleting missions failed: ${error.response.data.error}`));
  }
};
