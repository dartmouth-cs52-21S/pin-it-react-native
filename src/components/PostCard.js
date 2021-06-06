/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View, Text, StyleSheet, Image, Modal, Pressable, TouchableWithoutFeedback, Dimensions
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImages, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  bgTertiary, bgSecondary,
} from '../constants/colors';
import ModalCard from './ModalCard';
import * as LocationService from '../services/locationService';
import { getUser } from '../actions/user';
import fontStyles from '../constants/fonts';

// const width = Dimensions.get('window').width;

const PostCard = (props) => {
  const {
    location, item, isGridScreen, id
  } = props;
  const { title, category, longitude, latitude } = location;
  const [modalVisible, setModalVisible] = useState(false);

  const blankProfile = 'https://res.cloudinary.com/djc5u8rjt/image/upload/v1621833029/ux9xmvmtjl3nf7x7ls2n.png';
  const profileUrl = item.user? (item.user.profilePhoto ? item.user.profilePhoto : blankProfile):blankProfile;
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
          <View style={[styles.carouselFooter, isGridScreen ? styles.carouselFooterGridScreen : styles.carouselFooterFeedScreen]}>
            <Text
              style={[styles.carouselUsername, isGridScreen ? styles.carouselUsernameGridScreen : styles.carouselUsernameFeedScreen]}
              numberOfLines={1}
            >
              @
              {item.username}
            </Text>
            <View style={[styles.circle, isGridScreen ? styles.circleGridScreen : styles.circleFeedScreen]}>
              <Text style={styles.carouselNumImages}>
                {item.imageUrls.length}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
            <View style={styles.header}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <View style={styles.imagesIcon}>
                  <FontAwesomeIcon icon={faTimes} size={40} color="white" />
                </View>
              </Pressable>
            <View style={styles.header}>
              <View>
                <Text style={[fontStyles.largeHeaderTitle, { paddingBottom: 5, alignSelf: 'center'}]}
                onPress={async () => {
                  const fullLocation = await LocationService.getLocationPostsById(id);
                  props.navigation.navigate('GridScreen', {
                    location: {
                      title, category, latitude,longitude,
                    },
                    posts: fullLocation.data[0].posts,
                  });
                }}>
                  {location.title}
                  
                </Text>
                <Text style={[fontStyles.smallTextRegular, { paddingBottom: 5, paddingLeft: 1, alignSelf: 'center' }]}>
                  {location.address}
                </Text>
                <Text style={[fontStyles.smallTextRegular, { paddingBottom: 5, paddingLeft: 1, alignSelf: 'center' }]}>
                  {LocationService.getLocationPostsById.length}
                  {' reaches'}
                </Text>
                <View style={styles.horizontalLine}/>
                <Image style={styles.profilePhoto} source={{ uri: profileUrl }} />
                <Text style={[fontStyles.mediumTextRegular, { paddingTop: 5, paddingBottom: 5, paddingLeft: 1, alignSelf: 'center' }]}>
                  {'Reach by'}
                  {'\n'}
                  <View style={styles.userid}>
                  <Text style={[fontStyles.mediumTextRegular,{ paddingTop: 2, paddingBottom: 2, paddingLeft: 1, alignSelf: 'center'}]}>
                  {' @'}
                  {item.username}
                  {' '}
                </Text>
                </View>
                </Text>
                <Text style={[fontStyles.smallTextRegular, { paddingBottom: 5, paddingLeft: 1, alignSelf: 'center', justifyContent: 'center'}]}>
                  {item.user?item.user.badges.length:null}
                  {' badges '}
                  <Text style={[fontStyles.smallTextRegular, { paddingBottom: 5, paddingLeft: 1, fontSize: 10}]}>
                  {' \u2B24  '}
                  </Text>
                  {item.user?item.user.missionsCompleted:null}
                  {' missions completed'}
                  </Text>
              </View>
            </View>
            <ModalCard {...item}
              location={location}
            />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  // header: {
  //   backgroundColor: 'rgb(3, 9, 44)',
  //   width: '100%',
  //   borderTopLeftRadius: 20,
  //   borderTopRightRadius: 20,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   padding: 15,
  //   paddingBottom: 5,
  // },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    borderRadius: 20,
    backgroundColor: 'rgb(3, 9, 44)',
    shadowColor: '#000',
    height: '100%',
    width: '100%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  horizontalLine:{
    borderBottomColor: 'rgb(67, 78, 142)',
    borderBottomWidth: 1,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
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
  carouselFooter: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 1,
    backgroundColor: 'rgba(147,129,255, 0.5)',
  },
  carouselFooterFeedScreen: {
    bottom: 10,
    left: 10,
    padding: 5,
  },
  carouselFooterGridScreen: {
    bottom: 5,
    left: 5,
    padding: 3,
  },
  carouselUsername: {
    color: 'white',
    flexShrink: 1,
    paddingRight: 10,
  },
  carouselUsernameGridScreen: {
    fontSize: 20,
    maxWidth: 100,
  },
  carouselUsernameFeedScreen: {
    fontSize: 22,
    maxWidth: 200,
  },
  circle: {
    backgroundColor: 'rgba(147,129,255, 0.8)',
    borderRadius: 100,
    justifyContent: 'center',
  },
  circleGridScreen: {
    width: 30,
    height: 30,
  },
  circleFeedScreen: {
    width: 40,
    height: 40,
  },
  carouselNumImages: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  touchableImage: {
    flex: 1 / 2,
    aspectRatio: 1,
    margin: 2,
  },
  userid:{
    backgroundColor: 'rgb(129, 46, 125)',
    borderRadius: 30,
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
});

const mapStateToProps = (state) => ({
  user: state.user.userData,
});
export default connect(mapStateToProps, { getUser})(PostCard);