// import axios from 'axios';
// import { setError } from './app';
// import config from '../../app-config';

// const { api } = config;

export const ActionTypes = {
  GET_MISSIONS: 'GET_MISSIONS',
  SET_MISSION: 'SET_MISSION',
  CLEAR_MISSION: 'CLEAR_MISSION',
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
