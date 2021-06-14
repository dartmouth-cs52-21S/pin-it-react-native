import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../app-config';

const { api } = config;

export const generateMission = async (latitude, longitude, radius, query) => {
  const url = `${api}/new_mission?latitude=${latitude}&longitude=${longitude}&query=${query}&radius=${radius}`;
  const response = await axios.get(url);
  return response.data;
};

export const postMission = async (title, category, location) => {
  const url = `${api}/missions`;
  const post = { title, category, location };
  const token = await AsyncStorage.getItem('token');
  const response = await axios.post(url, post, { headers: { authorization: token } });
  return response.data;
};

export const routeToMission = async (latitude, longitude, endId) => {
  const url = `${api}/route?latitude=${latitude}&longitude=${longitude}&end=${endId}`;
  const token = await AsyncStorage.getItem('token');
  const response = await axios.get(url, { headers: { authorization: token } });
  return response.data;
};

export const completeMission = async (missionId) => {
  const url = `${api}/missions/${missionId}`;
  const token = await AsyncStorage.getItem('token');
  const response = await axios.put(url, {}, { headers: { authorization: token } });
  return response.data;
};
