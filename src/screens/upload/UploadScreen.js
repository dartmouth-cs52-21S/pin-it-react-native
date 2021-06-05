import React from 'react';
import { connect } from 'react-redux';
import {
  Text, TouchableOpacity, View, StyleSheet, Image,
} from 'react-native';
import { handleImageUpload } from '../../actions/posts';
import * as Colors from '../../constants/colors';
import fontStyles from '../../constants/fonts';

const bgImage = require('../../assets/upload-image.png');

const UploadScreen = (props) => {
  const { handleImageUpload: handleUploadPress } = props;
  const onSuccess = () => props.navigation.navigate('PostCreationScreen');

  return (
    <View style={styles.container}>
      <Image style={styles.uploadImage} source={bgImage} />
      <Text style={[fontStyles.smallHeaderTitle, styles.title]}>Share your journey</Text>
      <Text style={[fontStyles.smallMediumText, styles.descriptionText]}>Let us know of the exciting, beautiful, spontaneous, or boring places where you go! Or go to 🎲 to complete missions and earn badges.</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={() => handleUploadPress(onSuccess)}>
        <Text style={fontStyles.mediumTextBold}>Share photos</Text>
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
    backgroundColor: Colors.bgPrimary,
  },
  uploadButton: {
    alignSelf: 'center',
    backgroundColor: Colors.lightBlue,
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
  },
  title: {
    marginVertical: 20,
    color: Colors.accentPurple,
  },
  uploadImage: {
    marginBottom: 10,
    width: '90%',
    resizeMode: 'contain',
  },
  descriptionText: {
    width: '90%',
    textAlign: 'center',
  },
});

export default connect(null, { handleImageUpload })(UploadScreen);
