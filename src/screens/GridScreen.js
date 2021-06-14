import React, { useCallback } from 'react';
import {
  View, SafeAreaView, StyleSheet, FlatList,
} from 'react-native';
import { bgPrimary } from '../constants/colors';
import LocationHeader from '../components/LocationHeader';
import PostCard from '../components/PostCard';

const GridScreen = ({ route, navigation }) => {
  const { location, posts } = route.params;
  const postlen = posts.length;

  const renderItem = useCallback(({ item }) => (
    <PostCard location={location} item={item} length={postlen} navigation={navigation} isGridScreen />
  ));

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <LocationHeader location={location} />
      </View>
      <FlatList
        data={posts}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: -2,
    backgroundColor: bgPrimary,
  },
  header: {
    padding: 20,
  },
});

export default GridScreen;
