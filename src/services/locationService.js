import axios from 'axios';
import config from '../../app-config';

const { googleApi, googleApiKey, api } = config;

export const getLocationInfo = async (lat, long) => {
  const req = `${googleApi}/geocode/json?latlng=${lat},${long}&key=${googleApiKey}`;
  const response = await axios.get(req);
  const place = {
    address: response.data.results[0].formatted_address,
    place_id: response.data.results[0].place_id,
  };
  return place;
};

export const createLocation = async (location) => {
  try {
    const response = await axios.post(`${api}/locations`, location);
    return response;
  } catch (error) {
    return error;
  }
};
