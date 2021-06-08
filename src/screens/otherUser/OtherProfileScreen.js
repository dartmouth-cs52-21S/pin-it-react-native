import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, StyleSheet, Text, Image, View, Platform, Dimensions, Linking,
} from 'react-native';
import { connect } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import PostsTab from './OtherPostsTab';
import BadgesTab from './OtherBadgesTab';
import { accentPurple, bgPrimary, bgTertiary } from '../../constants/colors';
import PinsTab from './OtherPinsTab';
import getOtherUserInfo from '../../services/userService';

const instaLogo = require('../../assets/instagram.png');
const youtubeLogo = require('../../assets/youtube.png');

const windowWidth = (Dimensions.get('window').width) / 4;

const MissionsTab = () => (<Text style={styles.testText}>Missions</Text>);

const renderScene = ({ user, navigation }) => SceneMap({
  posts: () => (<PostsTab posts={user.posts} />),
  missions: MissionsTab,
  pins: () => (<PinsTab user={user} navigation={navigation} />),
  badges: () => (<BadgesTab badges={user.badges} />),
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

// Get other user info by username

const OtherProfileScreen = (props) => {
  const [user, setOtherUser] = useState('hi');
  // eslint-disable-next-line react/destructuring-assignment
  const { thisUsername } = props.route.params;
  const { navigation } = props;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'posts', title: 'Posts' },
    { key: 'missions', title: 'Missions' },
    { key: 'pins', title: 'Pins' },
    { key: 'badges', title: 'Badges' },
  ]);

  const getThisUser = async () => {
    const thisUserData = await getOtherUserInfo(thisUsername);
    setOtherUser(thisUserData);
  };

  useEffect(() => {
    getThisUser();
  }, [JSON.stringify(user)]);

  const blankProfile = 'https://res.cloudinary.com/djc5u8rjt/image/upload/v1621833029/ux9xmvmtjl3nf7x7ls2n.png';
  const blankInsta = 'https://www.instagram.com/?hl=en';
  const blankTwitter = 'https://twitter.com/home';
  const profileUrl = user.profPic ? user.profPic : blankProfile;
  const instaLink = user.instagram ? user.instagram : blankInsta;
  const twitterLink = user.twitter ? user.twitter : blankTwitter;

  return (
    <SafeAreaView style={styles.container}>
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
        renderScene={renderScene({ user, navigation })}
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

export default connect(null, null)(OtherProfileScreen);
