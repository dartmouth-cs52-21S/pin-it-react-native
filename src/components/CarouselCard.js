import React, { useState, useCallback, useRef } from 'react';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { bgSecondary } from '../constants/colors';
import categories from '../constants/categories';

const CarouselCard = (props) => {
  const {
    title, category, latitude, longitude, posts, images,
  } = props;

  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);

  // Carousel Image
  const renderItem = useCallback(({ item }) => (
    <View
      style={{
        height: 320,
        width: '100%',
      }}
    >
      <Image
        style={styles.carouselImage}
        source={posts ? { uri: item.imageUrls[0] }
          : { uri: item.image }}
      />
    </View>
  ), []);

  // Carousel Pagination
  const renderPagination = () => {
    return (
      <Pagination
        containerStyle={{ paddingVertical: 0 }}
        dotsLength={posts ? posts.length : images.length}
        activeDotIndex={activeIndex}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

  const renderIcon = () => {
    const { icon, style } = categories[category] || {};

    if (!icon) return (<></>);
    return (
      <View style={[styles.iconContainer, style]}>
        <FontAwesomeIcon icon={icon} size={23} color="white" />
      </View>
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        <Text numberOfLines={1} style={styles.title}>
          @
          {' '}
          {title}
        </Text>
        {renderIcon()}
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
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <Carousel
          layout="default"
          ref={ref}
          data={posts || images}
          sliderWidth={330}
          itemWidth={330}
          renderItem={renderItem}
          onSnapToItem={(index) => setActiveIndex(index)}
          margin={10}
        />
        { renderPagination() }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: bgSecondary,
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
  },
  heading: {
    flexDirection: 'row',
    flex: 0,
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    width: '80%',
  },
  detail: {
    fontSize: 12,
    color: 'white',
  },
  subheading: {
    flexDirection: 'row',
  },
  stars: {
    marginRight: 10,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
  iconContainer: {
    backgroundColor: '#2CA8C7',
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 10,
  },
});

export default CarouselCard;
