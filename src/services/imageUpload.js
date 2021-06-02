import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import config from '../../app-config';

// code adapted from image uploading tutorial at https://dev.to/joypalumbo/uploading-images-to-cloudinary-in-react-native-using-cloudinary-s-api-37mo#:~:text=Go%20to%20your%20Cloudinary%20Dashboard,down%20to%20%22upload%20presets%22.

const { cloudinaryApi } = config;

export const getPhoto = async () => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
    });

    if (!result.cancelled) {
      return result.base64;
    }
    return null;
  } catch (error) {
    return null;
  }
};

// This method is based off of the tutorial at https://dev.to/joypalumbo/uploading-images-to-cloudinary-in-react-native-using-cloudinary-s-api-37mo#:~:text=Go%20to%20your%20Cloudinary%20Dashboard,down%20to%20%22upload%20presets%22.
export const uploadPhoto = async (photo) => {
  try {
    const base64Img = `data:image/jpg;base64,${photo}`;
    const result = await axios.post(cloudinaryApi, { file: base64Img, upload_preset: 'zem5scju' });
    return result;
  } catch (error) {
    return error;
  }
};
