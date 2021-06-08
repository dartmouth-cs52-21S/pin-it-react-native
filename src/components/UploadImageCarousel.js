import React, { useState, useCallback, useRef } from 'react';
import {
  View, StyleSheet, Image,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import { bgTertiary } from '../constants/colors';
import { getUser, deletePost } from '../actions/user';

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
  ellipses: {
    borderRadius: 20,
    padding: 10,
    zIndex: 10,
    position: 'absolute',
    left: '90%',
    bottom: '-2%',
  },
  caption: {
    color: 'white',
    fontSize: 16,
    width: '95%',
    margin: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    borderRadius: 20,
    backgroundColor: bgTertiary,
    alignItems: 'center',
    shadowColor: '#000',
    width: '30%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button2: {
    backgroundColor: 'rgba(255,255,255,.2)',
    borderRadius: 20,
    padding: 10,
    zIndex: 10,
    marginTop: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    zIndex: 10,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
});

export default connect(null, { getUser, deletePost })(UploadImageCarousel);
