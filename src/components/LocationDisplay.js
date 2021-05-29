import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import config from '../../app-config';
import { accentPurple } from '../constants/colors';

const { googleApiKey } = config;

const LocationDisplay = (props) => {
  const locationInputRef = useRef();
  const { address } = props;
  const { textInputContainer, textInput } = styles;

  useEffect(() => {
    locationInputRef.current?.setAddressText(address || '');
  }, []);

  return (
    <GooglePlacesAutocomplete
      ref={locationInputRef}
      placeholder={address || 'No location found'}
      fetchDetails
      onPress={(data, details = null) => {
        props.onPress(data, details);
      }}
      currentLocation
      query={{
        key: googleApiKey,
        language: 'en',
      }}
      isRowScrollable={false}
      renderLeftButton={() => (
        <View style={styles.icon}>
          <Text>📍</Text>
        </View>
      )}
      styles={{ textInputContainer, textInput }}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 5,
    marginBottom: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textInputContainer: {
    width: '100%',
  },
  textInput: {
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    fontSize: 16,
    height: 40,
    paddingVertical: 5,
    color: accentPurple,
  },
});

export default LocationDisplay;
