import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import ButtonGroup from './ButtonGroup';
import { bgTertiary, accentGreen } from '../constants/colors';
import LocationDisplay from './LocationDisplay';

const NewMissionModal = (props) => {
  const { handleChangeLocation } = props;

  const handleSubmit = () => {
    props.onSubmit(25.7617, -80.1918, 5000, 'restaurant');
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title]}>New Mission  🏆</Text>
      <View style={styles.sectionContainer}>
        <Text style={styles.text}>I want to visit...</Text>
        <ButtonGroup
          choices={['Restaurants', 'Bars', 'Museums', 'Public Art', 'Outdoor Spaces', 'Photo Spots']}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.text}>I am willing to travel...</Text>
        <ButtonGroup
          choices={['<1 mile', '5-10 miles', '10-25 miles', '25+ miles']}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.text}>Generating new mission from</Text>
        <LocationDisplay
          containerStyle={styles.locationDisplay}
          handlePress={handleChangeLocation}
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
