/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useRef } from 'react';
import {
  View, Text, StyleSheet, Image, Modal, Pressable,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { bgPrimary, bgTertiary, accentPink } from '../constants/colors';
import PostCard from './PostCard';

const Card = (props) => {
  const {
    title, category, latitude, longitude, posts,
  } = props;

  const [activeIndex, setActiveIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const ref = useRef(null);

  const images = [];

  for (let i = 0; i < posts.length; i++) {
    images.push(
      posts[i],
    );
  }

  console.log(modalVisible);

  // Carousel Image
  const renderItem = useCallback(({ item }) => (
    <>
      <View
        style={{
          height: 320,
          width: '100%',
        }}
      >
        <Image
          style={styles.carouselImage}
          source={{ uri: item.images[0].image }}
        />
      </View>
      <Text> </Text>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>
          See full post by
          {' '}
          {item.username}
        </Text>
      </Pressable>
    </>
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
          data={images}
          sliderWidth={360}
          itemWidth={360}
          renderItem={renderItem}
          onSnapToItem={(index) => setActiveIndex(index)}
          margin={10}
        />
        { renderPagination() }
      </View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <PostCard {... posts[activeIndex]} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: bgPrimary,
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    width: '100%',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: bgTertiary,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: accentPink,
  },
  buttonClose: {
    backgroundColor: accentPink,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
