import React, { useState, useCallback, useRef } from 'react';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { bgTertiary } from '../constants/colors';
import LocationHeader from './LocationHeader';

const PostCard = (props) => {
  const {
    caption, imageUrls, location,
  // eslint-disable-next-line react/destructuring-assignment
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
        source={{ uri: item }}
      />
    </View>
  ), []);

  // Carousel Pagination
  const renderPagination = () => {
    return (
      <Pagination
        containerStyle={{ paddingVertical: 0 }}
        dotsLength={imageUrls.length}
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

  return (
    <View>
      <View style={styles.card}>
        <LocationHeader location={location} />
        <View style={{ height: 350, flexDirection: 'column', alignItems: 'center' }}>
          <Carousel
            layout="default"
            ref={ref}
            data={imageUrls}
            sliderWidth={330}
            itemWidth={330}
            renderItem={renderItem}
            onSnapToItem={(index) => setActiveIndex(index)}
            margin={10}
          />
          { renderPagination() }
        </View>

        <View style={styles.heading}>
          <Text style={styles.caption}>
            {caption}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: bgTertiary,
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
  },
  heading: {
    flexDirection: 'row',
    flex: 0,
    justifyContent: 'space-between',
  },
  caption: {
    color: 'white',
    fontSize: 16,
    width: '95%',
    margin: 10,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
});

export default PostCard;
