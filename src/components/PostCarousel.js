import React, { useState, useCallback, useRef } from 'react';
import {
  View, Text, StyleSheet, Image, Pressable, Modal,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisH, faTimes } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { bgTertiary } from '../constants/colors';
import LocationHeader from './LocationHeader';
import { getUser, deletePost } from '../actions/user';

const PostCarousel = (props) => {
  const {
    caption, imageUrls, location, id,
  // eslint-disable-next-line react/destructuring-assignment
  } = props;

  const [activeIndex, setActiveIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
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

  const deletePostAndUpdateUser = async () => {
    const message = props.deletePost(id);
    if (message) {
      props.getUser();
      setModalVisible(!modalVisible);
    }
  };

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
            <Pressable
              style={[styles.button2, styles.buttonClose]}
              onPress={deletePostAndUpdateUser}
            >
              <Text style={{ color: 'white' }}>
                Delete
              </Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <View style={styles.imagesIcon}>
                <FontAwesomeIcon icon={faTimes} size={24} color="white" />
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
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
        <Pressable
          style={[styles.ellipses, styles.buttonClose]}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.imagesIcon}>
            <FontAwesomeIcon icon={faEllipsisH} size={29} color="white" />
          </View>
        </Pressable>
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

export default connect(null, { getUser, deletePost })(PostCarousel);
