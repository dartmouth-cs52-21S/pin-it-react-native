/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Image, Modal, Pressable, TouchableWithoutFeedback,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImages, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  bgTertiary, bgSecondary,
} from '../constants/colors';
import ModalCard from './ModalCard';
import fontStyles from '../constants/fonts';

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
      <TouchableWithoutFeedback
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.touchableImage}>
          <Image
            style={styles.carouselImage}
            source={{ uri: item.imageUrls[0] }}
          />
          {item.imageUrls.length > 1 && (
          <View style={styles.imagesIcon}>
            <FontAwesomeIcon icon={faImages} size={23} color="white" />
          </View>
          )}
        </View>
      </TouchableWithoutFeedback>
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
            <View style={styles.header}>
              <View>
                <Text style={[fontStyles.mediumTextBold, { paddingTop: 5, paddingBottom: 5, paddingLeft: 1 }]}>
                  {item.username}
                  {' '}
                  @
                </Text>
                <Text style={[fontStyles.largeHeaderTitle, { paddingBottom: 5 }]}>
                  {location.title}
                </Text>
                <Text style={[fontStyles.smallTextRegular, { paddingBottom: 5, paddingLeft: 1 }]}>
                  {location.category}
                </Text>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <View style={styles.imagesIcon}>
                  <FontAwesomeIcon icon={faTimes} size={40} color="white" />
                </View>
              </Pressable>
            </View>
            <ModalCard {...item}
              location={location}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: bgSecondary,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    paddingBottom: 5,
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
    width: '100%',
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
  imagesIcon: {
    position: 'absolute',
    right: '5%',
    top: '5%',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  touchableImage: {
    flex: 1 / 3,
    aspectRatio: 1,
  },
});

export default PostCard;
