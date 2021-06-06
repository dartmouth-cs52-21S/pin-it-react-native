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
<<<<<<< HEAD
      .get(`${api}/locations?search=${search}&location=${location ? location.description : ''}`)
=======
      .get(`${api}/locations`, {
        params: {
          search,
          location: location ? location.title : '',
          tags,
        },
      })
>>>>>>> ce65153242f5ff05fd27a8bfbfd0bee2f295f7ff
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

export const setCurrentLocation = (location) => {
  return {
    type: ActionTypes.SET_CURRENT_LOCATION,
    payload: location,
  };
};
