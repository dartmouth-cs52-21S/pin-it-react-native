import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const OngoingActivityScreen = () => (
  <View style={styles.container}>
    <Text>Todo</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OngoingActivityScreen;
