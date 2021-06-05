import axios from 'axios';
import * as Location from 'expo-location';
import config from '../../app-config';
import { placeTypeToCategory } from '../constants/categories';

const { googleApi, googleApiKey, api } = config;

// Get location object from our server
export const getLocationPostsById = async (id) => {
  try {
    const response = await axios.get(`${api}/locations/posts/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getLocationByPlaceId = async (placeId) => {
  const req = `${googleApi}/place/details/json?placeid=${placeId}&fields=name,formatted_address,geometry,types&key=${googleApiKey}`;
  const response = await axios.get(req);
  const { result } = response.data;

  const { lat: latitude, lng: longitude } = result.geometry?.location || {};

  let category = 'Poi'; // default to Point of Interest
  for (const t of result.types) {
    if (placeTypeToCategory[t]) {
      category = placeTypeToCategory[t];
      break;
    }
  }

  const place = {
    placeId,
    latitude,
    longitude,
    title: result.name,
    address: result.formatted_address,
    category,
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

export const createLocation = async (location) => {
  try {
    const response = await axios.post(`${api}/locations`, location);
    return response;
  } catch (error) {
    return error;
  }
};
