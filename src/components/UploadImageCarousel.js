import React, { useState, useCallback, useRef } from 'react';
import {
  View, StyleSheet, Image, Dimensions,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import { getUser, deletePost } from '../actions/user';
import { formatImgUrl } from '../services/imageUpload';

const { width } = Dimensions.get('window');

const UploadImageCarousel = (props) => {
  const {
    imageUrls,
  // eslint-disable-next-line react/destructuring-assignment
  } = props;

  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);

  // Carousel Image
  const renderItem = useCallback(({ item }) => (
    <View
      style={{
        height: width,
        width,
      }}
    >
      <Image
        style={styles.carouselImage}
        source={{ uri: formatImgUrl(item, 1000, null) }}
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
        <View style={{ height: width, flexDirection: 'column', alignItems: 'center' }}>
          <Carousel
            layout="default"
            ref={ref}
            data={imageUrls}
            sliderWidth={width}
            itemWidth={width}
            renderItem={renderItem}
            onSnapToItem={(index) => setActiveIndex(index)}
            margin={10}
          />
          { renderPagination() }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingBottom: 20,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default connect(null, { getUser, deletePost })(UploadImageCarousel);
