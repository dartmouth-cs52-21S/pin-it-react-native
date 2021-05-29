import React, { useCallback } from 'react';
import {
  View, SafeAreaView, StyleSheet, FlatList,
} from 'react-native';
import { bgPrimary } from '../constants/colors';
import LocationHeader from '../components/LocationHeader';
import PostCard from '../components/PostCard';

const GridScreen = ({ route }) => {
  const { location, posts } = route.params;

  const renderItem = useCallback(({ item }) => (
    <PostCard location={location} item={item} post={item} />
  ));

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
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
  },
  gridItem: {
    flex: 1,
    margin: 10,
  },
  header: {
    padding: 20,
  },
});

export default GridScreen;
