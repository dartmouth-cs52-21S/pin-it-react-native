import React from 'react';
import {
  SafeAreaView, FlatList, StyleSheet, StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import PostCarousel from '../../components/PostCarousel';
import { bgPrimary } from '../../constants/colors';

const renderItem = ({ item }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <PostCarousel {...item} />
);

const PostsTab = (props) => {
  const { user } = props;
  const { posts } = user;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
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

const mapStateToProps = (state) => ({
  user: state.user.userData,
});

export default connect(mapStateToProps, null)(PostsTab);
