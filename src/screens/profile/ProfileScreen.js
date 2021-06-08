import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, StyleSheet, Text, Image, View, Platform, TextInput, Dimensions, Pressable, Linking, Modal,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { getUser, editUser } from '../../actions/user';
import { signOutUser } from '../../actions/auth';
import { getPhoto, uploadPhoto } from '../../services/imageUpload';
import { accentPurple, bgPrimary, bgTertiary } from '../../constants/colors';
import { getUserData } from '../../selectors/user';
import PostsTab from './PostsTab';
import BadgesTab from './BadgesTab';
import PinsTab from './PinsTab';
import MissionsTab from './MissionsTab';

const instaLogo = require('../../assets/instagram.png');
const youtubeLogo = require('../../assets/youtube.png');

const windowWidth = (Dimensions.get('window').width) / 4;

const renderScene = (props) => SceneMap({
  posts: PostsTab,
  missions: () => (<MissionsTab navigation={props.navigation} />),
  pins: () => (<PinsTab navigation={props.navigation} />),
  badges: BadgesTab,
});

const renderLabel = (labelProps) => (
  <View>
    <Text style={[
      {
        fontSize: 16,
        textAlign: 'center',
        width: windowWidth,
      },
      labelProps.focused ? { color: accentPurple, fontWeight: 'bold' } : { color: 'white' },
    ]}
    >
      {labelProps.route.title}
    </Text>
  </View>

);

const renderTabBar = (tabBarProps) => (
  <TabBar
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...tabBarProps}
    scrollEnabled
    indicatorStyle={{ backgroundColor: accentPurple }}
    style={{
      backgroundColor: bgPrimary,
      maxWidth: '100%',
    }}
    tabStyle={{
      padding: 0,
      borderColor: 'red',
      width: 'auto',
    }}
    renderLabel={renderLabel}
  />
);

const ProfileScreen = (props) => {
  const { user } = props;

  const [index, setIndex] = useState(0);
  const [editing, setEditing] = useState(false);
  const [bio, onChangeBio] = useState('');
  const [instagram, onChangeInsta] = useState('');
  const [twitter, onChangeTwitter] = useState('');
  const [pfpUrl, setNewPfpUrl] = useState('');
  const [workaround, changeWorkAround] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [routes] = useState([
    { key: 'posts', title: 'Posts' },
    { key: 'missions', title: 'Missions' },
    { key: 'pins', title: 'Pins' },
    { key: 'badges', title: 'Badges' },
  ]);

  const uploadPFP = async () => {
    const photo = await getPhoto();

    if (photo) {
      const result = await uploadPhoto(photo);
      setNewPfpUrl(result.data.url);
    }
  };

  const renderEditButton = (edit) => {
    if (!edit) {
      return (
        <TouchableOpacity style={styles.logoutButtonContainer} onPress={() => { setModalVisible(true); setEditing(true); }}>
          <Text style={styles.logoutButton}>Edit</Text>
        </TouchableOpacity>
      );
    } else {
      if (workaround === 0) {
        onChangeBio(user.bio);
        setNewPfpUrl(profileUrl);
        onChangeInsta(instaLink);
        onChangeTwitter(twitterLink);
        changeWorkAround(1);
      }
      const userdata = {
        instagram,
        twitter,
        bio,
        profPic: pfpUrl,
      };
      return (
        <Modal
          animationType="slide"
          visible={modalVisible}
          transparent
          onRequestClose={() => {
            setModalVisible(!modalVisible);
            setEditing(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.header}>
                <View />
                <Pressable
                  style={[styles.button]}
                  onPress={() => { setModalVisible(!modalVisible); setEditing(false); changeWorkAround(0); }}
                >
                  <View style={styles.imagesIcon}>
                    <FontAwesomeIcon icon={faTimes} size={29} color="white" />
                  </View>
                </Pressable>
              </View>
              <Image style={styles.profilePhoto} source={{ uri: pfpUrl }} />
              <TouchableOpacity style={styles.uploadButtonContainer} onPress={uploadPFP}>
                <Text style={styles.logoutButton}>Upload Profile Photo</Text>
              </TouchableOpacity>
              <View style={styles.inputContainer}>
                <Text style={[styles.logoutButton, { marginBottom: 10, color: accentPurple }]}>Bio</Text>
                <TextInput
                  style={styles.inputText}
                  maxLength={200}
                  onChangeText={onChangeBio}
                  value={bio}
                  multiline
                />

              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.logoutButton, { marginBottom: 10, color: accentPurple }]}>Instagram</Text>
                <TextInput
                  style={styles.inputText}
                  maxLength={100}
                  onChangeText={onChangeInsta}
                  value={instagram}
                  multiline
                />

              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.logoutButton, { marginBottom: 10, color: accentPurple }]}>Twitter</Text>
                <TextInput
                  style={styles.inputText}
                  maxLength={100}
                  onChangeText={onChangeTwitter}
                  value={twitter}
                  multiline
                />

              </View>
              <TouchableOpacity style={styles.logoutButtonContainer} onPress={() => { setModalVisible(!modalVisible); setEditing(false); props.editUser(userdata); }}>
                <Text style={styles.logoutButton}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      );
    }
  };

  useEffect(() => {
    props.getUser();
  }, [JSON.stringify(user)]);

  const blankProfile = 'https://res.cloudinary.com/djc5u8rjt/image/upload/v1621833029/ux9xmvmtjl3nf7x7ls2n.png';
  const blankInsta = 'https://www.instagram.com/?hl=en';
  const blankTwitter = 'https://twitter.com/home';
  const profileUrl = user.profPic ? user.profPic : blankProfile;
  const instaLink = user.instagram ? user.instagram : blankInsta;
  const twitterLink = user.twitter ? user.twitter : blankTwitter;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bannerContainer}>
        {renderEditButton(editing)}
        <TouchableOpacity style={styles.logoutButtonContainer} onPress={() => props.signOutUser()}>
          <Text style={styles.logoutButton}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileHeaderContainer}>
        <Image style={styles.profilePhoto} source={{ uri: profileUrl }} />
        <View style={styles.profileHeaderTextContainer}>
          <Text style={styles.usernameText}>
            @
            {user.username}
          </Text>
          <Text style={styles.userSubtitleText}>
            {user ? user.posts?.length : 0}
            {' '}
            Posts
          </Text>
          <Text style={styles.userSubtitleText}>
            {user.missionsCompleted}
            {' '}
            Completed Missions
          </Text>
        </View>
      </View>
      <Text style={styles.bioText}>{user.bio}</Text>
      <View style={styles.socialsContainer}>
        <Image style={styles.socialsLogo} source={instaLogo} />
        <Text style={styles.socialsText}
          onPress={() => Linking.openURL(instaLink)}
        >
          Instagram
        </Text>
        <Image style={styles.socialsLogo} source={youtubeLogo} />
        <Text style={styles.socialsText}
          onPress={() => Linking.openURL(twitterLink)}
        >
          Youtube

        </Text>
      </View>
      <TabView
        style={styles.tabViewContainer}
        navigationState={{ index, routes }}
        renderScene={renderScene(props)}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    width: '90%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: '10%',
    paddingVertical: '8%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    zIndex: 10,
  },
  imagesIcon: {
    position: 'absolute',
    right: '5%',
    top: '-20%',
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: bgPrimary,
    paddingTop: Platform.OS === 'android' ? 45 : 0,
  },
  bannerContainer: {
    height: 40,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  logoutButtonContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    height: 'auto',
    width: 'auto',
  },
  uploadButtonContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    margin: 20,
    borderRadius: 20,
    height: 'auto',
    width: 'auto',
  },
  logoutButton: {
    color: 'white',
    fontSize: 16,
  },
  profileHeaderContainer: {
    marginVertical: '3%',
    marginHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileHeaderTextContainer: {
    marginLeft: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  usernameText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  userSubtitleText: {
    color: 'lightgrey',
    fontSize: 14,
    marginBottom: 2,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  inputText: {
    color: 'white',
    borderBottomColor: accentPurple, // Add this to specify bottom border color
    borderBottomWidth: 1, // Add this to specify bottom border thickness
  },
  bioText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 15,
  },
  socialsContainer: {
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialsLogo: {
    width: 18,
    height: 18,
    marginLeft: 20,
  },
  socialsText: {
    color: accentPurple,
    marginLeft: 8,
    marginRight: 20,
    fontSize: 14,
  },
  testText: {
    marginTop: 50,
    textAlign: 'center',
    width: '100%',
    color: 'white',
  },
  tabViewContainer: {
    maxWidth: '100%',
    marginTop: 5,
  },
});

const mapStateToProps = (state) => ({
  user: getUserData(state),
});

export default connect(mapStateToProps, { getUser, signOutUser, editUser })(ProfileScreen);
