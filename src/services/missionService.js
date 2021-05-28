import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../app-config';

const { api } = config;

// eslint-disable-next-line import/prefer-default-export
export const generateMission = async (latitude, longitude, radius, query) => {
  const url = `${api}/new_mission?latitude=${latitude}&longitude=${longitude}&query=${query}&radius=${radius}`;
  console.log(url);
  const reponse = await axios.get(url);
  return reponse.data;
};

export const postMission = async (title, location, category) => {
  const url = `${api}/missions`;
  const post = { title, category, location };
  const token = await AsyncStorage.getItem('token');
  const response = await axios.post(url, post, { headers: { authorization: token } });
  return response.data;
};
