import React, { useRef, useEffect } from 'react';
import {
  StyleSheet, View, Text, LogBox,
} from 'react-native';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import config from '../../app-config';
import { getLocation } from '../selectors/app';
import { updateLocation } from '../actions/app';
import { accentPurple } from '../constants/colors';

// Ignores issue tied to GooglePlacesAutocomplete component
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const { googleApiKey } = config;

const LocationDisplay = (props) => {
  const locationInputRef = useRef();
  const { address } = props;
  const { onFocus, onBlur } = props;
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
        props.updateLocation(data.place_id);
        if (props.onPress) props.onPress(data, details);
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
      textInputProps={{ onFocus, onBlur }}
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

const mapStateToProps = (state) => ({
  address: getLocation(state)?.address,
});

export default connect(mapStateToProps, { updateLocation })(LocationDisplay);
