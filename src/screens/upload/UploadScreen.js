import React from 'react';
import { connect } from 'react-redux';
import {
  Text, TouchableOpacity, View, StyleSheet,
} from 'react-native';
import { handleImageUpload } from '../../actions/posts';

const UploadScreen = (props) => {
  const { handleImageUpload: handleUploadPress } = props;
  const onSuccess = () => props.navigation.navigate('PostCreationScreen');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.uploadButton} onPress={() => handleUploadPress(onSuccess)}>
        <Text>Upload Photo</Text>
      </TouchableOpacity>
    </View>
  );
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

export default connect(null, { handleImageUpload })(UploadScreen);
