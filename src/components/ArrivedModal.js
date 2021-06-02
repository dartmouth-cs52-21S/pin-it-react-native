import React from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity,
} from 'react-native';
import * as Colors from '../constants/colors';
import config from '../../app-config';

const { googleApiKey } = config;

const ArrivedModal = ({ mission, onPress }) => {
  let currUri = 'https://maps.googleapis.com/maps/api/place/photo?maxheight=300&photoreference=';
  currUri += mission.location.photo;
  const finalUri = `${currUri}&key=${googleApiKey}`;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>ARRIVED AT</Text>
      <Text style={[styles.titleText, { fontWeight: 'bold' }]}>{mission ? mission.title.toUpperCase() : ''}</Text>
      <Image style={styles.locationImage} source={{ uri: finalUri }} />
      <TouchableOpacity style={styles.startButton} onPress={onPress}>
        <Text style={styles.startButtonText}>Take Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ArrivedModal;

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
    fontSize: 26,
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '200',
  },

  locationImage: {
    marginTop: 20,
    marginBottom: 50,
    height: 250,
    width: 250,
    resizeMode: 'contain',
  },

  startButton: {
    height: 60,
    width: 180,
    borderRadius: 15,
    backgroundColor: Colors.accentGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },

  startButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
