import React, { useState, useCallback, useRef } from 'react';
import {
  View, Text, StyleSheet, Image, Pressable, Modal,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import {
  bgTertiary, bgPrimary, accentPurple,
} from '../constants/colors';
import LocationHeader from './LocationHeader';
import { getUser, deletePost } from '../actions/user';
import fontStyles from '../constants/fonts';

const PostCarousel = (props) => {
  const {
    caption, imageUrls, location, id, username, loggedInUser,
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
        transparent
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.textHeaderContainer}>
              <Text style={[fontStyles.smallTextBold, styles.textHeader]}>Just checking...</Text>
            </View>
            <Text style={[fontStyles.largeTextRegular, styles.mainText]}>Delete this post?</Text>
            <Text style={[fontStyles.smallTextRegular, styles.subText]}>This action is final and cannot be undone.</Text>
            <View style={styles.buttonsContainer}>
              <Pressable
                style={[styles.button, { backgroundColor: accentPurple }]}
                onPress={deletePostAndUpdateUser}
              >
                <Text style={fontStyles.smallMediumTextBold}>
                  Delete
                </Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={fontStyles.smallMediumTextBold}>
                  Cancel
                </Text>
              </Pressable>
            </View>
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
          {caption
          && (
          <Text style={styles.caption}>
            {caption}
          </Text>
          )}

        </View>
        {loggedInUser === username
        && (
        <Pressable
          style={[styles.ellipses, styles.buttonClose]}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.imagesIcon}>
            <FontAwesomeIcon icon={faEllipsisH} size={27} color="white" />
          </View>
        </Pressable>
        )}
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
    padding: 13,
    position: 'absolute',
    right: 0,
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
    backgroundColor: bgPrimary,
    alignItems: 'center',
    shadowColor: '#000',
    width: '70%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textHeaderContainer: {
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  textHeader: {
    textTransform: 'uppercase',
    color: accentPurple,
    padding: 20,
  },
  mainText: {
    padding: 10,
  },
  subText: {
    color: 'lightgrey',
    textAlign: 'center',
    padding: 20,
    paddingTop: 0,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    backgroundColor: bgTertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomStartRadius: 20,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
});

export default connect(null, { getUser, deletePost })(PostCarousel);
