import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { setError, displayToast } from './app';
import config from '../../app-config';
import { getPhoto, uploadPhoto } from '../services/imageUpload';

const { api } = config;

export const ActionTypes = {
  GET_POSTS: 'GET_POSTS',
  UPDATE_CURRENT_POST: 'UPDATE_CURRENT_POST',
};

/*
 * State dispatches
 */
export const updateCurrentPost = (currentPost) => {
  return {
    type: ActionTypes.UPDATE_CURRENT_POST,
    payload: currentPost,
  };
};

/*
 * Api Calls
 */
export const handleImageUpload = (onSuccess) => async (dispatch) => {
  const photo = await getPhoto();

  if (photo) {
    const result = await uploadPhoto(photo);
    dispatch(updateCurrentPost({ imageUrl: result.data.url }));
    onSuccess();
  }
};

export const createPost = (newPost, onSuccess) => async (dispatch) => {
  const token = await AsyncStorage.getItem('token');

  axios
    .post(`${api}/posts`, newPost, { headers: { authorization: token } })
    .then((response) => {
      console.log(response.data);
      onSuccess();
      displayToast('success', 'Post successfully created');
    })
    .catch((error) => {
      console.log(error);
      dispatch(setError(`Posting failed: ${error.response.data.error}`));
    });
};

export function getPosts() {
  return (dispatch) => {
    axios
      .get(`${api}/posts`)
      .then((response) => {
        dispatch({ type: ActionTypes.GET_POSTS, payload: response.data });
      })
      .catch((error) => {
        dispatch(setError(`Fetching posts failed: ${error.response.data.error}`));
      });
  };
}
