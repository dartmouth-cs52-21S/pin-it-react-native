import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';

const NewMission = (props) => {
  const [selected, setSelected] = useState([]);
  const locationTypes = ['Restaurants', 'Bars', 'Outdoor Spaces', 'Museums', 'Public Art', 'Photo Spots'];
  const handlePress = (location) => (selected.includes(location)
    ? setSelected(selected.filter((x) => x !== location)) // Handle Deselection
    : setSelected([...selected, location])); // Handle Selection

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Mission 🚀</Text>
      <Text>I want to visit...</Text>
      <View style={styles.buttonGroupContainer}>
        {locationTypes.map((location) => (
          <TouchableOpacity
            key={location}
            onPress={() => handlePress(location)}
            style={[styles.button, {
              backgroundColor: selected.includes(location)
                ? '#1C1E4a'
                : '#BE4FB3',
            }]}
          >
            <Text style={styles.buttonText}>{location}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  buttonGroupContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    margin: 2,
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
});

export default NewMission;
