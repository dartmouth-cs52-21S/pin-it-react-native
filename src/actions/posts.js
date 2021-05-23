import axios from 'axios';
import { setError } from './app';
import config from '../../app-config';
import { getPhoto, uploadPhoto } from '../services/imageUpload';

const { api } = config;

export const ActionTypes = {
  GET_POSTS: 'GET_POSTS',
  SET_UPLOADED_IMG: 'SET_UPLOADED_IMG',
};

export function getPosts() {
  return (dispatch) => {
    axios
      .get(`${api}/post`)
      .then((response) => {
        dispatch({ type: ActionTypes.GET_POSTS, payload: response.data });
      })
      .catch((error) => {
        dispatch(setError(`Fetching posts failed: ${error.response.data.error}`));
      });
  };
}

export const handleImageUpload = (onSuccess) => async (dispatch) => {
  const photo = await getPhoto();

  if (photo) {
    const result = await uploadPhoto(photo);
    dispatch({ type: ActionTypes.SET_UPLOADED_IMG, payload: result.data.url });
    onSuccess();
  }
};
