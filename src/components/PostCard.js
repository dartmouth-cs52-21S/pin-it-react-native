/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  View, Text, StyleSheet, Image, Modal, Pressable, TouchableWithoutFeedback, ScrollView, SafeAreaView,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImages, faTimes, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { formatImgUrl } from '../services/imageUpload';
import ModalCard from './ModalCard';
import { getLocationPostsById } from '../actions/locations';
import { getUser } from '../actions/user';
import fontStyles from '../constants/fonts';
import { accentPink } from '../constants/colors';

// const width = Dimensions.get('window').width;

const PostCard = (props) => {
  const {
    location, item, isGridScreen, id, length,
  } = props;
  const {
    title, category, longitude, latitude, address,
  } = location;
  const [modalVisible, setModalVisible] = useState(false);

  const blankProfile = 'https://res.cloudinary.com/djc5u8rjt/image/upload/v1621833029/ux9xmvmtjl3nf7x7ls2n.png';
  // eslint-disable-next-line no-nested-ternary
  const profileUrl = item.user ? (item.user.profPic ? item.user.profPic : blankProfile) : blankProfile;

  const renderMission = () => {
    if (!item.isMission) {
      return (null);
    } else {
      return (
        <View style={{
          position: 'absolute', top: 0, left: 0, padding: 7, flexDirection: 'row', backgroundColor: 'rgba(147,129,255, 0.5)', borderBottomRightRadius: 15,
        }}
        >
          <FontAwesomeIcon icon={faTrophy} size={23} color="white" />
          <Text style={[fontStyles.smallMediumText, { marginLeft: 5, alignSelf: 'center' }]}>Mission</Text>
        </View>
      );
    }
  };

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
            source={{ uri: formatImgUrl(item.imageUrls[0], 500, 500) }}
          />
          {renderMission()}
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
        <SafeAreaView style={styles.centeredView}>
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
                  <Text style={[fontStyles.largeHeaderTitle, { marginTop: 15, paddingBottom: 5, alignSelf: 'center' }]}
                    onPress={async () => {
                      const fullLocation = await getLocationPostsById(id);
                      setModalVisible(false);
                      props.navigation.navigate('GridScreen', {
                        location: {
                          title, category, latitude, longitude, address,
                        },
                        posts: fullLocation.data[0].posts,
                      });
                    }}
                  >
                    {location.title}
                  </Text>
                  <Text style={[fontStyles.smallTextRegular, { paddingBottom: 5, paddingLeft: 1, alignSelf: 'center' }]}>
                    {location.address}
                  </Text>
                  <Text style={[fontStyles.smallTextRegular, { paddingBottom: 5, paddingLeft: 1, alignSelf: 'center' }]}>
                    {length}
                    {' total post'}
                    {length === 1 ? '' : 's'}
                  </Text>
                  <View style={styles.horizontalLine} />
                  <View style={{
                    flex: 0, flexDirection: 'row', alignItems: 'center', margin: 10, justifyContent: 'center',
                  }}
                  >
                    <Image style={styles.profilePhoto} source={{ uri: profileUrl }} />
                    <View>
                      <Text style={[fontStyles.mediumTextRegular, {
                        paddingTop: 5, paddingBottom: 5, paddingLeft: 1, alignSelf: 'center',
                      }]}
                      >
                        Reach by
                      </Text>
                      <View style={styles.userid}>
                        <Text style={[fontStyles.mediumTextRegular, {
                          paddingTop: 2, paddingBottom: 2, paddingHorizontal: 3, alignSelf: 'center',
                        }]}
                          onPress={async () => {
                            setModalVisible(false);
                            props.navigation.navigate('OtherProfileScreen', { thisUsername: item.username });
                          }}
                        >
                          {'@'}
                          {item.username}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text style={[fontStyles.smallTextRegular, {
                    paddingBottom: 5, paddingLeft: 1, alignSelf: 'center', justifyContent: 'center',
                  }]}
                  >
                    {item.user ? item.user.badges.length : '0'}
                    {' badge'}
                    {item.user?.badges.length === 1 ? ' ' : 's '}
                    <View style={styles.circle} />
                    {item.user ? item.user.missionsCompleted : null}
                    {' missions completed'}
                  </Text>
                </View>
              </View>
              <ScrollView>
                <ModalCard {...item}
                  location={location}
                />
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
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
  },
  horizontalLine: {
    borderBottomColor: 'rgb(67, 78, 142)',
    borderBottomWidth: 1,
    width: 500,
    paddingTop: 10,
    paddingBottom: 10,
  },
  button: {
    borderRadius: 20,
    padding: 20,
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
    borderTopRightRadius: 15,
    bottom: 0,
    left: 0,
    padding: 5,
  },
  carouselFooterGridScreen: {
    bottom: 0,
    left: 0,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderTopRightRadius: 10,
  },
  carouselUsername: {
    color: 'white',
    flexShrink: 1,
    paddingRight: 10,
  },
  carouselUsernameGridScreen: {
    fontSize: 16,
    maxWidth: 100,
  },
  carouselUsernameFeedScreen: {
    fontSize: 18,
    maxWidth: 200,
  },
  circle: {
    backgroundColor: 'rgba(147,129,255, 0.8)',
    borderRadius: 100,
    justifyContent: 'center',
  },
  circleGridScreen: {
    width: 23,
    height: 23,
  },
  circleFeedScreen: {
    width: 28,
    height: 28,
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
  },
  userid: {
    backgroundColor: accentPink,
    borderRadius: 30,
  },
  profilePhoto: {
    width: 65,
    height: 65,
    borderRadius: 100,
    alignSelf: 'center',
    marginHorizontal: 15,
  },
});

const mapStateToProps = (state) => ({
  user: state.user.userData,
});
export default connect(mapStateToProps, { getUser })(PostCard);
