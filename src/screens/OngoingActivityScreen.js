import React from 'react';
import {
  Text, SafeAreaView, View, StyleSheet,
} from 'react-native';
import { bgPrimary } from '../constants/colors';
import fontStyles from '../constants/fonts';

const OngoingActivityScreen = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.headerContainer}>
      <Text style={fontStyles.largeHeaderTitle}>My Missions</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: bgPrimary,
  },
  headerText: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
  },
  headerContainer: {
    marginTop: 100,
    padding: 20,
  },
});

export default OngoingActivityScreen;
