import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { setError, displayToast } from './app';
import { getUser } from './user';
import config from '../../app-config';
import { uploadPhoto } from '../services/imageUpload';
import { setBadges } from './badges';

const { api } = config;

export const ActionTypes = {
  GET_POSTS: 'GET_POSTS',
  UPDATE_CURRENT_POST: 'UPDATE_CURRENT_POST',
  CLEAR_POST: 'CLEAR_POST',
  SET_POST_IMAGE: 'SET_POST_IMAGE',
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

export const clearPost = () => {
  return {
    type: ActionTypes.CLEAR_POST,
  };
};

export const setPostImage = (img) => {
  return {
    type: ActionTypes.SET_POST_IMAGE,
    payload: img,
  };
};

/*
 * Api Calls
 */
export const handleImageUpload = (onSuccess, navigation) => async (dispatch) => {
  navigation.navigate('ImageProcess');

//   if (photo) {
//     const result = await uploadPhoto(photo);
//     dispatch(setPostImage({ imageUrls: [result.data.url] }));
//     onSuccess();
//   }
};

export const handleImageProcess = (photos, navigation) => {
  return async (dispatch) => {
    const allImages = [];
    // eslint-disable-next-line guard-for-in
    for (const photo of photos) {
      // eslint-disable-next-line no-await-in-loop
      const result = await uploadPhoto(photo);
      allImages.push(result.data.url);
    }
    dispatch(setPostImage({ imageUrls: allImages }));
    navigation.navigate('PostCreationScreen');
  };
};

export const handleUploadfromCamera = (photo, onSuccess) => async (dispatch) => {
  if (photo) {
    const result = await uploadPhoto(photo);
    dispatch(setPostImage({ imageUrls: [result.data.url] }));
    onSuccess();
  }
};

export const createPost = (newPost, onSuccess) => async (dispatch) => {
  const token = await AsyncStorage.getItem('token');
  axios
    .post(`${api}/posts`, newPost, { headers: { authorization: token } })
    .then((response) => {
      dispatch(setBadges(response.data));
      onSuccess();
      displayToast('success', 'Post successfully created');
      dispatch(getUser());
    })
    .catch((error) => {
      dispatch(setError(`Posting failed: ${error.response.data}`));
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
