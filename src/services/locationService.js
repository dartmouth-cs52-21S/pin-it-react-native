import axios from 'axios';
import * as Location from 'expo-location';
import config from '../../app-config';

const { googleApi, googleApiKey, api } = config;

export const getLocationByPlaceId = async (placeId) => {
  const req = `${googleApi}/place/details/json?placeid=${placeId}&fields=name,formatted_address,geometry&key=${googleApiKey}`;
  const response = await axios.get(req);
  const { result } = response.data;

  const { lat: latitude, lng: longitude } = result.geometry?.location || {};

  const place = {
    placeId,
    latitude,
    longitude,
    title: result.name,
    address: result.formatted_address,
  };

  return place;
};

export const getLocationInfo = async (lat, long) => {
  const req = `${googleApi}/geocode/json?latlng=${lat},${long}&key=${googleApiKey}`;
  const response = await axios.get(req);
  const placeId = response.data.results[0].place_id;
  return getLocationByPlaceId(placeId);
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
    const place = await getLocationInfo(latitude, longitude) || {};

    callback(place);
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentLatLong = async (callback) => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      callback(null);
      return;
    }

    const geolocationInfo = await Location.getCurrentPositionAsync({ accuracy: 4 });
    const { latitude, longitude } = geolocationInfo.coords;
    callback({ latitude, longitude });
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
