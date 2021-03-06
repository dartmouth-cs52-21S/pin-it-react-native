/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useRef } from 'react';
import {
  View, Text, StyleSheet, Dimensions,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {
  bgPrimary, bgSecondary,
} from '../constants/colors';
import { categories } from '../constants/categories';
import PostCard from './PostCard';
import { getLocationPostsById } from '../actions/locations';
import fontStyles from '../constants/fonts';

const { width: viewportWidth } = Dimensions.get('window');

const LocationCarousel = (props) => {
  const {
    title, category, latitude, longitude, address, posts, id,
  } = props;

  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const postlen = posts.length;

  // Carousel Image
  const renderItem = useCallback(({ item }) => (
    <PostCard item={item}
      id={id}
      location={{
        title, category, latitude, longitude, address,
      }}
      navigation={props.navigation}
      length={postlen}
    />
  ), []);

  // Carousel Pagination
  const renderPagination = () => {
    if (posts.length > 1) {
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
            marginTop: 12,
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      );
    } else {
      return <Text style={{ fontSize: 0, marginBottom: 2 }}>{' '}</Text>;
    }
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

  const renderAddress = () => {
    if (address) {
      const addressarray = address.split(',');
      const state2 = addressarray[2];
      const state = String(state2).split(' ');
      if (state2 !== undefined) {
        return (
          <Text style={styles.detail} numberOfLines={1}>
            {addressarray[0]}
            ,
            {addressarray[1]}
            ,
            {' '}
            {state[1]}
          </Text>
        );
      } else {
        return (
          <Text style={styles.detail} numberOfLines={1}>
            {addressarray[0]}
            ,
            {' '}
            {addressarray[1]}
          </Text>
        );
      }
    } else {
      return (
        <Text style={styles.detail} numberOfLines={1}>
          {' '}
        </Text>
      );
    }
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
                style={[fontStyles.mediumTextBold, styles.title]}
                onPress={async () => {
                  const fullLocation = await getLocationPostsById(id);
                  props.navigation.navigate('GridScreen', {
                    location: {
                      title, category, latitude, longitude, address,
                    },
                    posts: fullLocation.data[0].posts,
                  });
                }}
              >
                {title}
              </Text>
            </View>
            <View style={styles.arrowContainer}>
              <Text style={fontStyles.smallMediumTextBold}
                onPress={async () => {
                  const fullLocation = await getLocationPostsById(id);
                  props.navigation.navigate('GridScreen', {
                    location: {
                      title, category, latitude, longitude, address,
                    },
                    posts: fullLocation.data[0].posts,
                  });
                }}
              >
                {posts?.length || 0}
                {' '}
              </Text>
              <FontAwesomeIcon icon={faChevronRight} size={14} color="white" />
            </View>
          </View>
          <View style={styles.subheading}>
            {renderAddress()}
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 12 }}>
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
  arrowContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 5,
    paddingLeft: 8,
  },
  title: {
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
    padding: '4%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: bgSecondary,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: 8,
    // borderTopColor: accentPurple, // Add this to specify bottom border color
    // borderTopWidth: 0.7, // Add this to specify bottom border thickness
  },
});

export default LocationCarousel;
