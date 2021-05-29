import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { accentPink, bgTertiary } from '../constants/colors';

const ButtonGroup = (props) => {
  const { selected, setSelected } = props;
  const { choices } = props;
  const handlePress = (index) => (selected.includes(index)
    ? setSelected(selected.filter((x) => x !== index)) // Handle Deselection
    : setSelected([...selected, index])); // Handle Selection
  return (
    <View style={styles.buttonGroupContainer}>
      {choices.map((choice, index) => (
        <TouchableOpacity
          key={choice}
          onPress={() => handlePress(index)}
          style={[styles.button, {
            backgroundColor: selected.includes(index)
              ? accentPink
              : bgTertiary,
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
