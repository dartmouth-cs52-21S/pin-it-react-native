import axios from 'axios';
import config from '../../app-config';

const { api } = config;

const getOtherUserInfo = async (username) => {
  const theStuff = await axios.get(`${api}/user/${username}`);
  return theStuff.data;
};

export default getOtherUserInfo;
