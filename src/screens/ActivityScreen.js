import React from 'react';
import { View, StyleSheet } from 'react-native';
import NewMissionModal from '../components/NewMissionModal';

const ActivityScreen = (props) => {
  return (
    <View style={styles.mainContainer}>
      <NewMissionModal />
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
