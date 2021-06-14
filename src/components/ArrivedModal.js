import React from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity,
} from 'react-native';
import * as Colors from '../constants/colors';
import config from '../../app-config';
import fontStyles from '../constants/fonts';

const { googleApiKey } = config;

const ArrivedModal = ({ mission, onPress }) => {
  let currUri = 'https://maps.googleapis.com/maps/api/place/photo?maxheight=300&photoreference=';
  currUri += mission.location.photo;
  const finalUri = `${currUri}&key=${googleApiKey}`;

  return (
    <View style={styles.container}>
      <Text style={[styles.titleText, fontStyles.largeTextRegular]}>ARRIVED AT</Text>
      <Text style={[styles.titleText, fontStyles.smallHeaderTitle]}>{mission ? mission.title.toUpperCase() : ''}</Text>
      <Image style={styles.locationImage} source={{ uri: finalUri }} />
      <TouchableOpacity style={styles.startButton} onPress={onPress}>
        <Text style={fontStyles.mediumTextBold}>Take Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 30,
  },
  titleText: {
    marginBottom: 10,
    textAlign: 'center',
  },
  locationImage: {
    marginVertical: 20,
    width: 250,
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  startButton: {
    alignSelf: 'center',
    backgroundColor: Colors.accentGreen,
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
  },
});

export default ArrivedModal;
