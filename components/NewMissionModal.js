import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
} from 'react-native';
import ButtonGroup from './ButtonGroup';
import { bgSecondary, accentGreen } from '../constants/colors';

const NewMission = (props) => {
  const [address, onChangeAddress] = useState('1791 Seattle Dr, Houston, TX 77923');

  const handleSubmit = () => {
    console.log('TODO: generate mission');
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
        <TextInput
          value={`📍 ${address}`}
          style={styles.address}
          onChangeText={onChangeAddress}
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
    backgroundColor: bgSecondary,
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
});

export default NewMission;
