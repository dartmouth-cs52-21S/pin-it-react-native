import React from 'react';
import {
  SafeAreaView, FlatList, StyleSheet, StatusBar,
} from 'react-native';
import PostCarousel from './PostCarousel';
import { bgPrimary } from '../constants/colors';

const PostCarouselList = ({ posts, loggedInUser }) => {
  const renderItem = ({ item }) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <PostCarousel {...item} loggedInUser={loggedInUser} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        initialScrollIndex={0}
        initialNumToRender={2}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        removeClippedSubviews={false}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 15,
    paddingVertical: 0,
    backgroundColor: bgPrimary,
  },
});

export default PostCarouselList;
