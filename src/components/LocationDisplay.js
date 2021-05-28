import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { getLocation } from '../selectors/app';
import config from '../../app-config';

const { googleApiKey } = config;

const LocationDisplay = (props) => {
  const locationInputRef = useRef();
  const { address } = props;

  return (
    <GooglePlacesAutocomplete
      ref={locationInputRef}
      placeholder={address || 'No location found'}
      fetchDetails
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true

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
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => ({
  address: getLocation(state)?.address,
});

export default connect(mapStateToProps, null)(LocationDisplay);
