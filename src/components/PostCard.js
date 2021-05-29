/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Image, Modal, Pressable, TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import {
  bgTertiary, accentPink,
} from '../constants/colors';
import PostCarousel from './PostCarousel';

const PostCard = (props) => {
  const {
    location, item,
  } = props;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {/* Code for displaying images evenly in grid view
      https://stackoverflow.com/questions/54039345/display-images-in-flatlist/54042860
      */}
      <TouchableOpacity
        style={{
          flex: 1,
          aspectRatio: 1,
        }}
        onPress={() => setModalVisible(true)}
      >
        <Image
          style={styles.carouselImage}
          source={{ uri: item.imageUrls[0] }}
        />
        <Pressable
          style={[styles.button, styles.buttonOpen]}
        >
          <FontAwesomeIcon icon={faImages} size={23} color="white" />
        </Pressable>
      </TouchableOpacity>
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
            <PostCarousel {...item}
              location={location}
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
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    padding: 20,
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default PostCard;
