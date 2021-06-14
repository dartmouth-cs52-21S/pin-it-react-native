import React from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity,
} from 'react-native';
import * as Colors from '../constants/colors';
import config from '../../app-config';
import fontStyles from '../constants/fonts';

const { googleApiKey } = config;

const MissionFoundModal = ({ location, onAccept }) => {
  let currUri = 'https://maps.googleapis.com/maps/api/place/photo?maxheight=300&photoreference=';
  currUri += location.photo;
  const finalUri = `${currUri}&key=${googleApiKey}`;

  return (
    <View style={styles.container}>
      <Text style={[styles.titleText, fontStyles.largeTextRegular]}>TAKE A PHOTO AT</Text>
      <Text style={[styles.titleText, fontStyles.smallHeaderTitle]} numberOfLines={3}>{location ? location.title.toUpperCase() : ''}</Text>
      <Image style={styles.locationImage} source={{ uri: finalUri }} />
      <TouchableOpacity style={styles.startButton} onPress={onAccept}>
        <Text style={fontStyles.mediumTextBold}>Accept</Text>
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
    justifyContent: 'center',
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

export default MissionFoundModal;
