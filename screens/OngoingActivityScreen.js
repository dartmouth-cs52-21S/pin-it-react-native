import React from 'react';
import {
  Text, TouchableOpacity, View, StyleSheet,
} from 'react-native';
import { getPhoto, uploadPhoto } from '../services/ImageUpload';

const OngoingActivityScreen = () => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.uploadButton} onPress={onButtonPress}>
      <Text>Upload Photo</Text>
    </TouchableOpacity>
  </View>
);

const onButtonPress = async () => {
  const photo = await getPhoto();
  if (photo) {
    const result = await uploadPhoto(photo);
    console.log(result.data.url);
  }
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    width: 150,
    height: 50,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OngoingActivityScreen;
