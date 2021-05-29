/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useRef } from 'react';
import {
  View, Text, StyleSheet, Image, Modal, Pressable,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImages, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {
  bgPrimary, bgTertiary, bgSecondary, accentPink,
} from '../constants/colors';
import PostCard from './PostCard';
import categories from '../constants/categories';

const CarouselCard = (props) => {
  const {
    title, category, latitude, longitude, address, posts,
  } = props;

  const [activeIndex, setActiveIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const ref = useRef(null);

  // Carousel Image
  const renderItem = useCallback(({ item }) => (
    <>
      <View
        style={{
          height: 360,
          width: '96%',
          flex: 1,
          alignSelf: 'center',
        }}
      >
        <Image
          style={styles.carouselImage}
          source={posts ? { uri: item.imageUrls[0] }
            : { uri: item.image }}
        />
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <FontAwesomeIcon icon={faImages} size={23} color="white" />
        </Pressable>
        <Text style={[styles.textStyle, styles.username, { color: 'black' }]}>
          @
          {' '}
          {item.username}
        </Text>
      </View>
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
      <View style={{
        backgroundColor: bgSecondary, padding: '3.5%', borderRadius: 15, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={styles.heading}>
              {renderIcon()}
              <Text
                numberOfLines={1}
                style={styles.title}
                onPress={() => props.navigation.navigate('GridScreen', {
                  location: {
                    title, category, latitude, longitude,
                  },
                })}
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
            <PostCard {...posts[activeIndex]}
              location={{
                title, category, latitude, longitude, address,
              }}
            />
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
    marginTop: 20,
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
    zIndex: 10,
  },
  buttonOpen: {
    position: 'absolute',
    right: 3,
    top: 3,
  },
  buttonClose: {
    backgroundColor: accentPink,
  },
  username: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(255,255,255,0.75)',
    padding: 3,
    paddingRight: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
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

export default CarouselCard;
