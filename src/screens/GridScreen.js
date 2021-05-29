import React, { useCallback } from 'react';
import {
  View, SafeAreaView, StyleSheet, FlatList, Image, TouchableOpacity,
} from 'react-native';
import { bgPrimary } from '../constants/colors';
import LocationHeader from '../components/LocationHeader';

const GridScreen = ({ route }) => {
  const { location, posts } = route.params;

  /* Code for displaying images evenly in gridview
    https://stackoverflow.com/questions/54039345/display-images-in-flatlist/54042860
  */
  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity
      style={{
        flex: 1, // here you can use flex:1 also
        aspectRatio: 1,
      }}
    >
      <Image style={styles.gridItem}
        resizeMode="cover"
        source={{ uri: item.imageUrls[0] }}
      />
    </TouchableOpacity>
  ));

  return (

    <SafeAreaView style={styles.container}>
      <View>
        <LocationHeader location={location} />

      </View>
      <FlatList
        data={posts}
        numColumns={3}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgPrimary,
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  gridItem: {
    flex: 1,
    margin: 5,
  },
});

export default GridScreen;
