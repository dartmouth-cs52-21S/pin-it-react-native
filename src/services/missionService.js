import axios from 'axios';
import config from '../../app-config';

const { api } = config;

// eslint-disable-next-line import/prefer-default-export
export const generateMission = async (latitude, longitude, radius, query) => {
  const url = `${api}/new_mission?latitude=${latitude}&longitude=${longitude}&query=${query}&radius=${radius}`;
  console.log(url);
  const reponse = await axios.get(url);
  return reponse.data;
};
