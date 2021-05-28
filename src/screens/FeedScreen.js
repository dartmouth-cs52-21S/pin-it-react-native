import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View, SafeAreaView, StyleSheet, StatusBar, Text, RefreshControl, Animated,
} from 'react-native';
import { useCollapsibleSubHeader, CollapsibleSubHeaderAnimator } from 'react-navigation-collapsible';
import { SearchBar } from 'react-native-elements';
import { getLocations } from '../actions/locations';
import CarouselCard from '../components/CarouselCard';
import TagRow from '../components/TagRow';
import LocationDisplay from '../components/LocationDisplay';
import { bgPrimary } from '../constants/colors';

const FeedScreen = (props) => {
  const [search, setSearch] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [tags, setTags] = useState([]);
  const { locationsList } = props;

  useEffect(() => {
    props.getLocations();
  }, []);

  const handleTagPressed = (tagValue) => {
    if (tags.includes(tagValue)) {
      setTags(tags.filter((x) => x !== tagValue));
    } else {
      setTags([...tags, tagValue]);
    }
  };

  const handleRefresh = async () => {
    setIsFetching(true);
    await props.getLocations();
    setIsFetching(false);
  };

  const renderHeader = () => (
    <View style={styles.header}>
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
      <LocationDisplay containerStyle={styles.locationDisplay} handlePress={() => props.navigation.navigate('ChangeLocationScreen')} />
      <TagRow
        active={tags}
        handleTagPressed={handleTagPressed}
      />
    </View>
  );

  const renderItem = ({ item }) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <CarouselCard {...item} />
  );

  const {
    onScroll /* Event handler */,
    containerPaddingTop /* number */,
    scrollIndicatorInsetTop /* number */,
    translateY,
  } = useCollapsibleSubHeader();

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        onScroll={onScroll}
        contentContainerStyle={{ paddingTop: containerPaddingTop }}
        scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
        // ListHeaderComponent={renderHeader}
        data={locationsList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        onRefresh={handleRefresh}
        refreshing={isFetching}
        refreshControl={(
          <RefreshControl
            refreshing={isFetching}
            onRefresh={handleRefresh}
            tintColor="red"
            colors={['red', 'green']}
            size={RefreshControl.SIZE.LARGE}
          />
        )}
      />
      <CollapsibleSubHeaderAnimator translateY={translateY}>
        {renderHeader()}
      </CollapsibleSubHeaderAnimator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 15,
    backgroundColor: bgPrimary,
  },
  header: {
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
  locationDisplay: {
    marginBottom: 10,
    width: '100%',
    maxWidth: '100%',
  },
});

const mapStateToProps = (state) => ({
  locationsList: state.locations.locationsList,
});

export default connect(mapStateToProps, { getLocations })(FeedScreen);
