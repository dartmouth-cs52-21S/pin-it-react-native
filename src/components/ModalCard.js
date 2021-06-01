import React, { useState, useCallback, useRef } from 'react';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { bgTertiary } from '../constants/colors';
import fontStyles from '../constants/fonts';

const ModalCard = (props) => {
  const {
    caption, imageUrls, createdAt,
  // eslint-disable-next-line react/destructuring-assignment
  } = props;

  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const getDateString = (difference) => {
    if (Math.floor(difference / (1000 * 60)) < 60) {
      const time = Math.floor(difference / (1000 * 60));
      const dtstr = `${time} minutes ago`;
      return dtstr;
    }
    if (Math.floor(difference / (1000 * 60 * 60)) < 24) {
      const time = Math.floor(difference / (1000 * 60 * 60));
      const dtstr = `${time} hours ago`;
      return dtstr;
    } else {
      const time = Math.floor(difference / (1000 * 60 * 60 * 24));
      const dtstr = `${time} days ago`;
      return dtstr;
    }
  };

  const date = new Date(createdAt);
  const realdate = new Date();
  const diff = realdate - date;

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

        <View style={{
          flexDirection: 'row',
          flexWrap: 1,
        }}
        >
          <Text style={[fontStyles.mediumTextRegular, {
            width: '95%',
            margin: 10,
            marginBottom: 3,
          }]}
          >
            {caption}
          </Text>
          <Text style={[fontStyles.smallTextRegular, {
            width: '95%',
            margin: 10,
          }]}
          >
            {getDateString(diff)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: bgTertiary,
    padding: 10,
    borderRadius: 5,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
});

export default ModalCard;
