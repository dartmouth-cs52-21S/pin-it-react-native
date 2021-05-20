import React from 'react';
import { View, StyleSheet } from 'react-native';
import LocationInput from '../components/LocationInput';

const ActivityScreen = (props) => {
  return (
    <View style={styles.mainContainer}>
      <LocationInput />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default ActivityScreen;
