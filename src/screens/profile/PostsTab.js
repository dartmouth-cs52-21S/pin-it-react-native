import React from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import CarouselCard from '../../components/CarouselCard';

const mockData = [
  {
    id: 'test1',
    title: 'Dish Society',
    rating: 4,
    category: 'Restaurant',
    latitude: 0,
    longitude: 0,
    images: [
      { image: 'https://images.getbento.com/accounts/fa5a0ad193d9db0f760b62a4b1633afd/media/images/67297Memorial_entrance.jpg' },
      { image: 'https://images.getbento.com/accounts/fa5a0ad193d9db0f760b62a4b1633afd/media/images/4171table_spread_2.jpg' },
    ],
  },
  {
    id: 'test2',
    title: 'Graffiti Alley in Central Square',
    rating: 2,
    category: 'Restaurant',
    latitude: 20,
    longitude: 20,
    images: [
      { image: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/central-square-cambridge-ma-graffiti-alley-cambridge-massachusetts-toby-mcguire.jpg' },
    ],
  },
];

const renderItem = ({ item }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <CarouselCard {...item} />
);

const PostsTab = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={mockData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  testText: {
    marginTop: 50,
    textAlign: 'center',
    width: '100%',
    color: 'white',
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
});

export default PostsTab;
