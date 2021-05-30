import axios from 'axios';
import { setError } from './app';
import config from '../../app-config';

const { api } = config;

export const ActionTypes = {
  GET_LOCATIONS: 'GET_LOCATIONS',
};

export const getLocations = (search, locationTitle) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${api}/locations?search=${search || ''}&location=${locationTitle}`)
      .then((response) => {
        dispatch({ type: ActionTypes.GET_LOCATIONS, payload: response.data });
        resolve();
      })
      .catch((error) => {
        dispatch(setError(`Fetching locations failed: ${error.response.data.error}`));
        reject();
      });
  });
};
