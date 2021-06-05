/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import ButtonGroup from './ButtonGroup';
import { bgTertiary, accentGreen } from '../constants/colors';
import LocationDisplay from './LocationDisplay';
import { getLocationByPlaceId } from '../services/locationService';
import fontStyles from '../constants/fonts';

const NewMissionModal = (props) => {
  const milesToMeters = 1609.34;
  const { onFocus, onBlur } = props;

  const [places, setPlaces] = useState([]);
  const [distances, setDistances] = useState([]);
  const [start, setStart] = useState(props.currentLocation);

  const placeChoices = ['Restaurant', 'Bar', 'Museum', 'Park', 'Landmark', 'Store'];
  const distChoices = ['<1 mile', '5-10 miles', '10-25 miles', '25+ miles'];

  let distValues = [1, 10, 25, 50];
  distValues = distValues.map((num) => num * milesToMeters);

  const onLocationSelect = async (data) => {
    const placeId = data.place_id;
    const { latitude, longitude } = await getLocationByPlaceId(placeId);
    setStart({ latitude, longitude });
  };

  const handleSubmit = () => {
    if (places.length === 0 || distances.length === 0) return;

    const randomPlaceNum = Math.floor(Math.random() * places.length);
    const placeToSearch = places[randomPlaceNum];

    const randomDistNum = Math.floor(Math.random() * distances.length);
    const distToSearch = distances[randomDistNum];

    if (!start) return;

    const { latitude, longitude } = start;
    props.onSubmit(latitude, longitude, distValues[distToSearch], placeChoices[placeToSearch]);
  };

  return (
    <View style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={fontStyles.largeTextBold}>New Mission  🏆</Text>
      <View style={styles.sectionContainer}>
        <Text style={[styles.text, fontStyles.mediumTextRegular]}>I want to visit...</Text>
        <ButtonGroup
          choices={placeChoices}
          selected={places}
          setSelected={setPlaces}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={[styles.text, fontStyles.mediumTextRegular]}>I am willing to travel...</Text>
        <ButtonGroup
          choices={distChoices}
          selected={distances}
          setSelected={setDistances}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.text}>Generating new mission from</Text>
        <LocationDisplay
          containerStyle={styles.locationDisplay}
          onPress={onLocationSelect}
          onClear={() => setStart(props.currentLocation)}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </View>
      <View style={styles.sectionContainer}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.button}
        >
          <Text style={fontStyles.mediumTextBold}>New Mission</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingTop: 30,
    paddingHorizontal: 28,
  },
  text: {
    marginBottom: 5,
  },
  sectionContainer: {
    marginVertical: 10,
  },
  address: {
    backgroundColor: bgTertiary,
    borderRadius: 10,
    padding: 8,
    color: 'white',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: accentGreen,
    padding: 10,
    borderRadius: 10,
  },
  locationDisplay: {
    width: '100%',
  },
});

const mapStateToProps = (state) => ({
  currentLocation: state.locations.currentLocation,
});

export default connect(mapStateToProps, null)(NewMissionModal);
