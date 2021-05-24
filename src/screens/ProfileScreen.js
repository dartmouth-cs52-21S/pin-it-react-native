import React, { useState } from 'react';
import {
  SafeAreaView, Button, StyleSheet, Text, Image, View,
} from 'react-native';
import { connect } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { signOutUser } from '../actions/auth';
import * as Colors from '../constants/colors';

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

const renderTabBar = (props) => (
  <TabBar
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    indicatorStyle={{ backgroundColor: Colors.accentPurple }}
    style={{ backgroundColor: Colors.bgPrimary, marginLeft: 50, marginRight: 50 }}
    labelStyle={{ fontSize: 13 }}
    tabStyle={{ padding: 0 }}
    activeColor={Colors.accentPurple}
    inactiveColor="white"
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
        <Text style={styles.socialsText}>Instagram</Text>
        <Text style={styles.socialsText}>Youtube</Text>
      </View>
      <View style={styles.logoutButtonContainer}>
        <Button style={styles.logoutButton} title="Log Out" onPress={() => props.signOutUser()} />
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
  logoutButtonContainer: {
    position: 'absolute',
    top: 50,
    right: 10,
  },
  profileHeaderContainer: {
    marginTop: 40,
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  userSubtitleText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 2,
  },
  bioText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 30,
    marginRight: 20,
    marginTop: 20,
  },
  socialsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialsText: {
    color: Colors.accentPurple,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 16,
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
