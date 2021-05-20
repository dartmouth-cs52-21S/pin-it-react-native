import React, { useState } from 'react';
import {
  SafeAreaView, FlatList, StyleSheet, StatusBar,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import Card from '../components/Card';

const mockData = [
  {
    id: 'test1',
    title: 'Gile Mountain',
    latitude: 0,
    longitude: 0,
  },
  {
    id: 'test2',
    title: 'Baker Berry Clock Tower',
    latitude: 20,
    longitude: 20,
  },
  {
    id: 'test3',
    title: 'The Green',
    latitude: 50,
    longitude: 50,
  },
];

const renderItem = ({ item }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Card {...item} />
);

const FeedScreen = (props) => {
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Search by location"
        onChangeText={(text) => setSearch(text)}
        value={search}
      />
      <FlatList
        data={mockData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 12,
  },
});

export default FeedScreen;
