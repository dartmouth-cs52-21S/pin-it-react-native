/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useRef } from 'react';
import {
  View, Text, StyleSheet, Dimensions,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import {
  bgPrimary, bgSecondary,
} from '../constants/colors';
import categories from '../constants/categories';
import PostCard from './PostCard';
import { getLocationPostsById } from '../services/locationService';
import { getQueriedLocations } from '../actions/locations';

const { width: viewportWidth } = Dimensions.get('window');

const LocationCarousel = (props) => {
  const {
    title, category, latitude, longitude, address, posts, id,
  } = props;

  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);

  // Carousel Image
  const renderItem = useCallback(({ item }) => (
    <PostCard item={item}
      location={{
        title, category, latitude, longitude, address,
      }}
    />
  ), []);

  // Carousel Pagination
  const renderPagination = () => {
    return (
      <Pagination
        containerStyle={{ paddingVertical: 0 }}
        dotsLength={posts.length}
        activeDotIndex={activeIndex}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          marginVertical: 20,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

  const renderIcon = () => {
    const { icon, style } = categories[category] || {};

    if (!icon) return (null);
    return (
      <View style={[styles.iconContainer, style]}>
        <FontAwesomeIcon icon={icon} size={23} color="white" />
      </View>
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.locationHeader}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={styles.heading}>
              {renderIcon()}
              <Text
                numberOfLines={1}
                style={styles.title}
                onPress={async () => {
                  const fullLocation = await getLocationPostsById(id);
                  props.navigation.navigate('GridScreen', {
                    location: {
                      title, category, latitude, longitude,
                    },
                    posts: fullLocation.data[0].posts,
                  });
                }}
              >
                {title}
              </Text>
            </View>
            <View style={{ alignSelf: 'center' }}>
              <Text style={{
                height: 20, backgroundColor: 'rgba(255, 255, 255, 0.2)', fontSize: 16, color: 'white',
              }}
              >
                {posts?.length || 0}
                {' '}
                <FontAwesomeIcon icon={faChevronRight} size={14} color="white" />
              </Text>
            </View>
          </View>
          <View style={styles.subheading}>
            <Text style={styles.detail}>
              Location:
              {' '}
              {latitude}
              ,
              {' '}
              {longitude}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <Carousel
          layout="default"
          ref={ref}
          data={posts}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth}
          renderItem={renderItem}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
        { renderPagination() }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: bgPrimary,
    width: '100%',
  },
  heading: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: '3%',
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingLeft: 7,
    width: '80%',
  },
  detail: {
    fontSize: 12,
    color: 'white',
  },
  subheading: {
    flexDirection: 'row',
  },
  iconContainer: {
    backgroundColor: '#2CA8C7',
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 10,
  },
  locationHeader: {
    backgroundColor: bgSecondary,
    padding: '4%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = (state) => ({
  queriedLocationsList: state.locations.queriedLocationsList,
});

export default connect(mapStateToProps, { getQueriedLocations })(LocationCarousel);
