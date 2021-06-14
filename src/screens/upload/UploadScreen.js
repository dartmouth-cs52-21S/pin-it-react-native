/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Text, TouchableOpacity, View, StyleSheet, Image,
} from 'react-native';
import { handleImageUpload } from '../../actions/posts';
import * as Colors from '../../constants/colors';
import fontStyles from '../../constants/fonts';
import BadgeModal from '../../components/BadgeModal';

const bgImage = require('../../assets/upload-image.png');

const UploadScreen = (props) => {
  const { handleImageUpload: handleUploadPress } = props;
  const onUploadPress = () => props.navigation.navigate('PostCreationScreen');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (props.badges.length > 0) {
      setModalVisible(true);
    }
  }, [JSON.stringify(props.badges)]);

  return (
    <View style={styles.container}>
      <Image style={styles.uploadImage} source={bgImage} />
      <Text style={[fontStyles.largeTextBold, styles.title]}>Share your journey</Text>
      <Text style={[fontStyles.smallTextRegular, styles.descriptionText]}>Let us know of the exciting, beautiful, spontaneous, or boring places where you go! Or go to 🎲 to complete missions and earn badges.</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={() => handleUploadPress(onUploadPress, props.navigation)}>
        <Text style={fontStyles.mediumTextBold}>Share photos</Text>
      </TouchableOpacity>
      <BadgeModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
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

const mapStateToProps = (state) => ({
  badges: state.badges.badgeList,
});

export default connect(mapStateToProps, { handleImageUpload })(UploadScreen);
