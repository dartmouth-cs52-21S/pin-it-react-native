import React, { useState } from 'react';
import {
  SafeAreaView, FlatList, StyleSheet, StatusBar, Text,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import Card from '../components/Card';
import { bgPrimary } from '../constants/colors';

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
      { image: 'https://scoutcambridge.com/wp-content/uploads/2018/03/ByDanaForsythe-1.jpg' },
      { image: 'https://gregcookland.com/wonderland/wp-content/uploads/2020/06/picBlackLivesMatter-GraffitiAlleyCambridge200618_0038w.jpg' }],
  },
];

const renderItem = ({ item }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Card {...item} />
);

const FeedScreen = (props) => {
  const [search, setSearch] = useState('');

  const renderSearchbar = () => (
    <SearchBar
      placeholder="Search by location"
      onChangeText={(text) => setSearch(text)}
      lightTheme
      value={search}
      searchIcon={<Text style={{ fontSize: 10 }}>🔍</Text>}
      containerStyle={styles.searchContainer}
      inputStyle={{ backgroundColor: 'white', fontSize: 12 }}
      inputContainerStyle={{
        backgroundColor: 'white', borderRadius: 10, height: 35, paddingVertical: 20,
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={renderSearchbar}
        data={mockData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
  searchContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    margin: 0,
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FeedScreen;
