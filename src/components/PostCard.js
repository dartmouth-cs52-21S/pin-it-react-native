/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Image, Modal, Pressable, TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
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
      <TouchableOpacity
        style={{
          flex: 1 / 3,
          aspectRatio: 1,
        }}
        onPress={() => setModalVisible(true)}
      >
        <Image
          style={styles.carouselImage}
          source={{ uri: item.imageUrls[0] }}
        />
        {item.imageUrls.length > 1 && (
        <View style={styles.imagesIcon}>
          <FontAwesomeIcon icon={faImages} size={23} color="white" />
        </View>
        )}
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
            <View style={styles.header}>
              <View>
                <Text>
                  {item.username}
                  {' '}
                  @
                </Text>
                <Text>
                  {location.title}
                </Text>
                <Text>
                  {location.category}
                </Text>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>X</Text>
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
