import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, StyleSheet, Text, Image, View, Platform, TextInput, Dimensions, Pressable, Linking, Modal,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
import fontStyles from '../../constants/fonts';

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
      fontStyles.smallMediumText,
      {
        textAlign: 'center',
        width: windowWidth,
      },
      labelProps.focused
        ? [fontStyles.smallMediumTextBold, { color: accentPurple }]
        : {},
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
          <Text style={fontStyles.smallTextRegular}>Edit</Text>
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
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollView}
          >
            <View style={styles.modalView}>
              <View style={styles.closeContainer}>
                <Pressable
                  style={[styles.button]}
                  onPress={() => { setModalVisible(!modalVisible); setEditing(false); changeWorkAround(0); }}
                >
                  <FontAwesomeIcon icon={faTimes} size={29} color="white" />
                </Pressable>
              </View>
              <Image style={styles.profilePhoto} source={{ uri: pfpUrl }} />
              <Pressable style={styles.uploadButtonContainer} onPress={uploadPFP}>
                <Text style={fontStyles.smallTextRegular}>Upload Profile Photo</Text>
              </Pressable>
              <View style={styles.inputContainer}>
                <Text style={[fontStyles.smallTextRegular, { marginBottom: 10, color: accentPurple }]}>Bio</Text>
                <TextInput
                  style={styles.inputText}
                  maxLength={150}
                  onChangeText={onChangeBio}
                  value={bio}
                  multiline
                  blurOnSubmit
                />

              </View>
              <View style={styles.inputContainer}>
                <Text style={[fontStyles.smallTextRegular, { marginBottom: 10, color: accentPurple }]}>Instagram</Text>
                <TextInput
                  style={styles.inputText}
                  maxLength={100}
                  onChangeText={onChangeInsta}
                  value={instagram}
                  multiline
                  blurOnSubmit
                />

              </View>
              <View style={styles.inputContainer}>
                <Text style={[fontStyles.smallTextRegular, { marginBottom: 10, color: accentPurple }]}>Twitter</Text>
                <TextInput
                  style={styles.inputText}
                  maxLength={100}
                  onChangeText={onChangeTwitter}
                  value={twitter}
                  multiline
                  blurOnSubmit
                />

              </View>
              <Pressable style={styles.logoutButtonContainer} onPress={() => { setModalVisible(!modalVisible); setEditing(false); props.editUser(userdata); }}>
                <Text style={fontStyles.smallTextRegular}>Done</Text>
              </Pressable>

            </View>
          </KeyboardAwareScrollView>
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
          <Text style={fontStyles.smallTextRegular}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileHeaderContainer}>
        <Image style={styles.profilePhoto} source={{ uri: profileUrl }} />
        <View style={styles.profileHeaderTextContainer}>
          <Text style={[fontStyles.mediumTextBold, styles.usernameText]}>
            @
            {user.username}
          </Text>
          <Text style={[fontStyles.smallTextRegular, styles.userSubtitleText]}>
            {user ? user.posts?.length : 0}
            {' '}
            Posts
          </Text>
          <Text style={[fontStyles.smallTextRegular, styles.userSubtitleText]}>
            {user.missionsCompleted}
            {' '}
            Completed Missions
          </Text>
        </View>
      </View>
      <Text style={[fontStyles.smallTextRegular, styles.bioText]}>{user.bio}</Text>
      <View style={styles.socialsContainer}>
        <Image style={styles.socialsLogo} source={instaLogo} />
        <Text style={[fontStyles.smallTextRegular, styles.socialsText]}
          onPress={() => Linking.openURL(instaLink)}
        >
          Instagram
        </Text>
        <Image style={styles.socialsLogo} source={youtubeLogo} />
        <Text style={[fontStyles.smallTextRegular, styles.socialsText]}
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
  closeContainer: {
    flex: 1,
    position: 'absolute',
    right: '5%',
    top: '3%',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalView: {
    borderRadius: 20,
    backgroundColor: bgTertiary,
    alignSelf: 'center',
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
  profileHeaderContainer: {
    marginTop: '3%',
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
    marginBottom: 6,
  },
  userSubtitleText: {
    color: 'lightgrey',
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
    marginHorizontal: '5%',
    marginVertical: '3%',
  },
  socialsContainer: {
    marginVertical: '3%',
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
