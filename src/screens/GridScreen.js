import React from 'react';
import {
  View, SafeAreaView, StyleSheet, FlatList, Text,
} from 'react-native';
import { bgPrimary } from '../constants/colors';
import LocationHeader from '../components/LocationHeader';

const GridScreen = ({ route }) => {
  const { location } = route.params;

  return (

    <SafeAreaView style={styles.container}>
      <View>
        <LocationHeader location={location} />

      </View>
      <FlatList>
        <View>
          <Text>
            hir
          </Text>
        </View>
      </FlatList>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgPrimary,
    paddingVertical: 30,
  },
});

export default GridScreen;
