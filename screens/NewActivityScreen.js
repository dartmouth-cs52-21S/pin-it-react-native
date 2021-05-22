import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import { bgPrimary } from '../constants/colors';

const NewActivityScreen = (props) => {
  const onMarkerPress = (e) => {
    console.log('pressed');
  };

  return (
    <View syle={styles.container}>
      <MapView
        style={{ width: '100%', height: '100%', zIndex: -1 }}
      >
        <Marker coordinate={{ latitude: 43.7044, longitude: -72.2887 }}
          onPress={onMarkerPress}
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.newActivityButton}>
          <Text style={styles.buttonText}>🎲 Generate New Mission</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 40,
    margin: 'auto',
    height: 50,
    right: 0,
    left: 0,
    zIndex: 1,
  },
  newActivityButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: 260,
    backgroundColor: bgPrimary,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
});

export default NewActivityScreen;
