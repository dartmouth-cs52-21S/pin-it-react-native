import axios from 'axios';
import * as Location from 'expo-location';
import config from '../../app-config';

const { googleApi, googleApiKey, api } = config;

export const getLocationInfo = async (lat, long) => {
  const req = `${googleApi}/geocode/json?latlng=${lat},${long}&key=${googleApiKey}`;
  const response = await axios.get(req);
  const place = {
    address: response.data.results[0].formatted_address,
    placeId: response.data.results[0].place_id,
  };
  return place;
};

// callback - on end
export const getCurrentLocation = async (callback) => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      callback(null);
      return;
    }

    const geolocationInfo = await Location.getCurrentPositionAsync({ accuracy: 4 });
    const { latitude, longitude } = geolocationInfo.coords;

    const { address, placeId } = await getLocationInfo(latitude, longitude);

    callback({
      latitude, longitude, address, placeId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createLocation = async (location) => {
  try {
    const response = await axios.post(`${api}/locations`, location);
    return response;
  } catch (error) {
    return error;
  }
};
