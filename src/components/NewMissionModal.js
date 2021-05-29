/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import ButtonGroup from './ButtonGroup';
import { bgTertiary, accentGreen } from '../constants/colors';
import LocationDisplay from './LocationDisplay';
import { getLocationByPlaceId } from '../services/locationService';

const NewMissionModal = (props) => {
  const [places, setPlaces] = useState([]);
  const [distances, setDistances] = useState([]);
  const [start, setStart] = useState(props.initialLocation);

  const milesToMeters = 1609.34;

  const placeChoices = ['Restaurants', 'Bars', 'Museums', 'Parks', 'Landmarks'];
  const distChoices = ['<1 mile', '5-10 miles', '10-25 miles', '25+ miles'];

  let distValues = [1, 10, 25, 50];
  distValues = distValues.map((num) => num * milesToMeters);

  const onLocationSelect = async (data) => {
    const placeId = data.place_id;
    const { latitude, longitude } = await getLocationByPlaceId(placeId);
    console.log(latitude, longitude);
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
      <Text style={[styles.title]}>New Mission  🏆</Text>
      <View style={styles.sectionContainer}>
        <Text style={styles.text}>I want to visit...</Text>
        <ButtonGroup
          choices={placeChoices}
          selected={places}
          setSelected={setPlaces}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.text}>I am willing to travel...</Text>
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
        />
      </View>
      <View style={styles.sectionContainer}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.button}
        >
          <Text style={styles.buttonText}>New Mission</Text>
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
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginVertical: 15,
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
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  locationDisplay: {
    width: '100%',
  },
});

export default NewMissionModal;
