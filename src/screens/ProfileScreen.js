import React, { useState } from 'react';
import {
  SafeAreaView, StyleSheet, Text, Image, View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { signOutUser } from '../actions/auth';
import * as Colors from '../constants/colors';

const instaLogo = require('../assets/instagram.png');
const youtubeLogo = require('../assets/youtube.png');

const MissionsTab = () => (<Text style={styles.testText}>Missions</Text>);
const PostsTab = () => (<Text style={styles.testText}>Posts</Text>);
const BadgesTab = () => (<Text style={styles.testText}>Badges</Text>);
const PinsTab = () => (<Text style={styles.testText}>Pins</Text>);

const renderScene = SceneMap({
  posts: PostsTab,
  missions: MissionsTab,
  pins: PinsTab,
  badges: BadgesTab,
});

const renderLabel = (labelProps) => (
  <Text style={[
    {
      fontSize: 16,
      textAlign: 'center',
      width: 'auto',
      paddingRight: 5, // Let me know how this looks on your screen, for mine, it's needed to offset the bolding

    },
    labelProps.focused ? { color: Colors.accentPurple, fontWeight: 'bold' } : { color: 'white' },
  ]}
  >
    {labelProps.route.title}
  </Text>
);

const renderTabBar = (props) => (
  <TabBar
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    scrollEnabled
    indicatorStyle={{ backgroundColor: Colors.accentPurple }}
    style={{
      backgroundColor: Colors.bgPrimary, marginLeft: '5%', marginRight: '5%',
    }}
    tabStyle={{
      padding: 0,
      borderLeftWidth: 10,
      borderRightWidth: 10,
      width: 'auto',
    }}
    renderLabel={renderLabel}
  />
);

const ProfileScreen = (props) => {
  const user = {
    email: 'test@test.com',
    username: 'Tester_10',
    missionsCompleted: 14,
    profilePhoto: '',
    badges: [
      {
        badgeId: {
          title: 'Pro Explorer',
          iconUrl: '',
        },
      },
      {
        badgeId: {
          title: 'World Traveler',
          iconUrl: '',
        },
      },
    ],
    posts: [1, 1, 1, 1, 1, 1, 1, 1, 1],
    bio: '"Food Eats First!"',
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'posts', title: 'Posts' },
    { key: 'missions', title: 'Missions' },
    { key: 'pins', title: 'Pins' },
    { key: 'badges', title: 'Badges' },
  ]);

  const blankProfile = 'https://res.cloudinary.com/djc5u8rjt/image/upload/v1621833029/ux9xmvmtjl3nf7x7ls2n.png';
  const profileUrl = user.profilePhoto ? user.profilePhoto : blankProfile;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bannerContainer}>
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
            {user.posts.length}
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
        <Text style={styles.socialsText}>Instagram</Text>
        <Image style={styles.socialsLogo} source={youtubeLogo} />
        <Text style={styles.socialsText}>Youtube</Text>
      </View>
      <TabView
        style={styles.tabViewContainer}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.bgPrimary,
  },
  bannerContainer: {
    height: 40,
    alignItems: 'flex-end',
  },
  logoutButtonContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 'auto',
    width: 'auto',
  },
  logoutButton: {
    color: 'white',
    fontSize: 16,
  },
  profileHeaderContainer: {
    marginTop: '5%',
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
    width: 100,
    height: 100,
    marginLeft: 30,
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
  bioText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 25,
  },
  socialsContainer: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialsLogo: {
    width: 18,
    height: 18,
    marginLeft: 20,
  },
  socialsText: {
    color: Colors.accentPurple,
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
    marginTop: 20,
  },
});

export default connect(null, { signOutUser })(ProfileScreen);
