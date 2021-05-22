import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { accentPink, bgSecondary } from '../constants/colors';

const ButtonGroup = (props) => {
  const [selected, setSelected] = useState([]);
  const { choices } = props;
  const handlePress = (choice) => (selected.includes(choice)
    ? setSelected(selected.filter((x) => x !== choice)) // Handle Deselection
    : setSelected([...selected, choice])); // Handle Selection
  return (
    <View style={styles.buttonGroupContainer}>
      {choices.map((choice) => (
        <TouchableOpacity
          key={choice}
          onPress={() => handlePress(choice)}
          style={[styles.button, {
            backgroundColor: selected.includes(choice)
              ? accentPink
              : bgSecondary,
          }]}
        >
          <Text style={styles.buttonText}>{choice}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGroupContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5, // Ensures the end buttons do not have margin
  },
  button: {
    alignItems: 'center',
    margin: 3,
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 10,
  },
});
export default ButtonGroup;
