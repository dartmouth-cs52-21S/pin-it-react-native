import axios from 'axios';
import { setError } from './app';
import config from '../../app-config';

const { api } = config;

export const ActionTypes = {
  GET_LOCATIONS: 'GET_LOCATIONS',
};

export function getLocations() {
  return (dispatch) => {
    axios
      .get(`${api}/locations`)
      .then((response) => {
        dispatch({ type: ActionTypes.GET_LOCATIONS, payload: response.data });
      })
      .catch((error) => {
        dispatch(setError(`Fetching locations failed: ${error.response.data.error}`));
      });
  };
}
