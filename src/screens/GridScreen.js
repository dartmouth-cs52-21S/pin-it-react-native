import React from 'react';
import {
  View, SafeAreaView, StyleSheet, FlatList, Text,
} from 'react-native';
import { bgPrimary } from '../constants/colors';

const GridScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList>
        <View>
          <Text> Hi</Text>
        </View>
      </FlatList>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgPrimary,
  },
});

export default GridScreen;
