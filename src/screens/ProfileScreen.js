import React from 'react';
import {
  SafeAreaView, Button, StyleSheet, Text, Image, View,
} from 'react-native';
import { connect } from 'react-redux';
import { signOutUser } from '../actions/auth';
import * as Colors from '../constants/colors';

const ProfileScreen = (props) => {
  const user = {
    email: 'test@test.com',
    username: 'test_man_10',
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
      <Button title="Log Out" onPress={() => props.signOutUser()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.bgPrimary,
  },
  profileHeaderContainer: {
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
});

export default connect(null, { signOutUser })(ProfileScreen);
