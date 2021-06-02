import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
  View, SafeAreaView, StyleSheet, StatusBar, Text, RefreshControl, Animated, TouchableOpacity,
} from 'react-native';
import { useCollapsibleSubHeader, CollapsibleSubHeaderAnimator } from 'react-navigation-collapsible';
import { SearchBar } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getQueriedLocations } from '../actions/locations';
import LocationCarousel from '../components/LocationCarousel';
import TagRow from '../components/TagRow';
import LocationDisplay from '../components/LocationDisplay';
import { bgPrimary, accentPurple } from '../constants/colors';

const FeedScreen = (props) => {
  const [search, setSearch] = useState('');
  const searchRef = useRef();
  const [searchFocused, setSearchFocused] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [tags, setTags] = useState([]);
  const { queriedLocationsList, location } = props;

  /* Show all locations (no search query) on first render; referenced:
  https://stackoverflow.com/questions/53253940/make-react-useeffect-hook-not-run-on-initial-render
  */
  useEffect(() => {
    props.getQueriedLocations(search, location);
  }, [location]);

  const handleTagPressed = (tagValue) => {
    if (tags.includes(tagValue)) {
      setTags(tags.filter((x) => x !== tagValue));
    } else {
      setTags([...tags, tagValue]);
    }
  };

  const handleRefresh = async () => {
    setIsFetching(true);
    await props.getQueriedLocations(search, location);
    setIsFetching(false);
  };

  const handleCancel = () => {
    setSearchFocused(false);
    searchRef?.current?.blur();
  };

  const renderSearchIcon = () => {
    if (searchFocused) {
      return (
        <TouchableOpacity style={styles.searchIcon} onPress={handleCancel}>
          <FontAwesomeIcon icon={faArrowLeft} size={15} color={accentPurple} />
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={styles.searchIcon}>
          <Text style={{ fontSize: 10 }}>🔍</Text>
        </View>
      );
    }
  };

  const handleSubmitEditing = () => {
    props
      .getQueriedLocations(search, location)
      .finally(() => setSearchFocused(false));
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          ref={searchRef}
          placeholder="Search by location"
          onChangeText={(text) => setSearch(text)}
          onSubmitEditing={handleSubmitEditing}
          lightTheme
          value={search}
          searchIcon={renderSearchIcon()}
          containerStyle={styles.searchContainer}
          inputStyle={{ backgroundColor: 'white', fontSize: 16 }}
          inputContainerStyle={{
            backgroundColor: 'white', borderRadius: 10, height: 35, paddingVertical: 20,
          }}
          onFocus={() => setSearchFocused(true)}
        />
        {/* {searchFocused
        && (
        <TouchableOpacity style={styles.doneButton} onPress={handleCancel}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
        )} */}
      </View>

      {searchFocused && <LocationDisplay />}
      {!searchFocused && (
        <TagRow
          active={tags}
          handleTagPressed={handleTagPressed}
        />
      )}
    </View>
  );

  const renderItem = ({ item }) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <LocationCarousel {...item} navigation={props.navigation} />
  );

  const {
    onScroll /* Event handler */,
    containerPaddingTop /* number */,
    scrollIndicatorInsetTop /* number */,
    translateY,
  } = useCollapsibleSubHeader();

  return (
    <SafeAreaView style={styles.container}>
      {!searchFocused && (
      <Animated.FlatList
        onScroll={onScroll}
        contentContainerStyle={{ paddingTop: containerPaddingTop }}
        scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
        style={styles.postList}
        data={queriedLocationsList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        onRefresh={handleRefresh}
        refreshing={isFetching}
        refreshControl={(
          <RefreshControl
            refreshing={isFetching}
            onRefresh={handleRefresh}
            tintColor="white"
            colors={['white']}
            size={RefreshControl.SIZE.LARGE}
          />
        )}
      />
      )}
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
    backgroundColor: bgPrimary,
  },
  header: {
    backgroundColor: bgPrimary,
    paddingBottom: 10,
    width: '100%',
    paddingHorizontal: 15,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    margin: 0,
    paddingHorizontal: 0,
    flexGrow: 1,
  },
  title: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  locationDisplay: {
    marginBottom: 15,
    alignSelf: 'center',
    width: '95%',
    maxWidth: '100%',
    height: 40,
  },
  searchIcon: {
    width: 20,
  },
});

const mapStateToProps = (state) => ({
  queriedLocationsList: state.locations.queriedLocationsList,
  location: state.app.location,
});

export default connect(mapStateToProps, { getQueriedLocations })(FeedScreen);
