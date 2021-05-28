import React from 'react';
import {
  SafeAreaView, FlatList, StyleSheet, StatusBar,
} from 'react-native';
import PostCard from './PostCard';
import { bgPrimary } from '../constants/colors';

const renderItem = ({ item }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <PostCard {...item} />
);

const PostsTab = (props) => {
  const posts = [
    {
      username: 'Tester_10',
      images: [
        { image: 'https://images.getbento.com/accounts/fa5a0ad193d9db0f760b62a4b1633afd/media/images/67297Memorial_entrance.jpg' },
        { image: 'https://images.getbento.com/accounts/fa5a0ad193d9db0f760b62a4b1633afd/media/images/4171table_spread_2.jpg' },
      ],
      caption: 'super interesting caption jfklsjfklds jfdkls jfdskl fj fd fdsl fdsjkfds l fjdsk fdsl fjdskl fjdsk l',
      location: {
        title: 'Dish Society',
        placeId: 'jfkdlf', // Google maps place id
        category: 'Restaurant',
        latitude: 10,
        longitude: 20,
      },
    },
    {
      username: 'Tester_10',
      images: [
        { image: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/central-square-cambridge-ma-graffiti-alley-cambridge-massachusetts-toby-mcguire.jpg' },
        { image: 'https://scoutcambridge.com/wp-content/uploads/2018/03/ByDanaForsythe-1.jpg' },
        { image: 'https://gregcookland.com/wonderland/wp-content/uploads/2020/06/picBlackLivesMatter-GraffitiAlleyCambridge200618_0038w.jpg' }],
      caption: 'super interesting caption',
      location: {
        title: 'Graffiti',
        placeId: 'jfkdlf', // Google maps place id
        category: 'Public Art',
        latitude: 11,
        longitude: 20,
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
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
    paddingVertical: 15,
    backgroundColor: bgPrimary,
  },
});

export default PostsTab;
