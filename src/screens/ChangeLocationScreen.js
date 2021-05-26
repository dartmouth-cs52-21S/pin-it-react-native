import React from 'react';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { bgPrimary, bgTertiary } from '../constants/colors';
import config from '../../app-config';

const { googleApiKey } = config;

const ChangeLocationScreen = (props) => {
  const onMarkerPress = (e) => {
    console.log('pressed');
  };

  return (
    <View style={styles.container}>
      <MapView
        style={{ width: '100%', height: '100%', zIndex: -1 }}
      >
        <Marker coordinate={{ latitude: 43.7044, longitude: -72.2887 }}
          onPress={onMarkerPress}
        />
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = true) => {
          // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: googleApiKey,
            language: 'en',
          }}
          currentLocation
        />
      </MapView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: bgPrimary,
  },
  uploadedImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  input: {
    backgroundColor: bgTertiary,
    borderRadius: 10,
    padding: 8,
    color: 'white',
    width: '100%',
  },
});

export default connect(null, null)(ChangeLocationScreen);
