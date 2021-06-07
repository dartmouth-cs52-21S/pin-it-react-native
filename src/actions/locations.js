import axios from 'axios';
import { setError } from './app';
import config from '../../app-config';

const { api } = config;

export const ActionTypes = {
  GET_QUERIED_LOCATIONS: 'GET_QUERIED_LOCATIONS',
  SET_CURRENT_LOCATION: 'SET_CURRENT_LOCATION',
};

export const getQueriedLocations = (search, location, tags) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${api}/locations`, {
        params: {
          search,
          location: location ? location.title : '',
          tags,
        },
      })
      .then((response) => {
        dispatch({ type: ActionTypes.GET_QUERIED_LOCATIONS, payload: response.data });
        resolve();
      })
      .catch((error) => {
        dispatch(setError(`Fetching queried locations failed: ${error.response.data.error}`));
        reject();
      });
  });
};

// Get location object from our server
export const getLocationPostsById = async (id) => {
  try {
    const response = await axios.get(`${api}/locations/posts/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const setCurrentLocation = (location) => {
  return {
    type: ActionTypes.SET_CURRENT_LOCATION,
    payload: location,
  };
};
