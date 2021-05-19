import React from 'react';
import { StyleSheet, View } from 'react-native';
import MainTabBar from './navigation/MainTabBar';

export default function App() {
  return (
    <View style={styles.container}>
      <MainTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
