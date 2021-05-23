import React, { useState, useCallback, useRef } from 'react';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUtensils, faStar } from '@fortawesome/free-solid-svg-icons';
import { bgSecondary } from '../constants/colors';

const Card = (props) => {
  const {
    title, rating, category, latitude, longitude, images,
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
        source={{ uri: item.image }}
      />
    </View>
  ), []);

  // Carousel Pagination
  const renderPagination = () => {
    return (
      <Pagination
        containerStyle={{ paddingVertical: 0 }}
        dotsLength={images.length}
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
    switch (category) {
      case 'Restaurant':
        return (
          <View style={styles.iconContainer}>
            <FontAwesomeIcon icon={faUtensils} size={23} color="white" />
          </View>
        );
      default:
        return <Text>Hi</Text>;
    }
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < rating; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} size={20} color="#FFD700" />);
    }

    for (let i = 0; i < 5 - rating; i++) {
      stars.push(<FontAwesomeIcon key={rating + i} icon={faStar} size={20} color="gray" />);
    }

    return (
      <Text style={styles.stars}>
        {stars}
      </Text>
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
        {renderStars()}
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
          data={images}
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

export default Card;
