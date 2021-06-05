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
import PostsTab from './PostsTab';
import BadgesTab from './BadgesTab';
import { signOutUser } from '../../actions/auth';
import * as Colors from '../../constants/colors';
// import fontStyles from '../../constants/fonts';

const instaLogo = require('../../assets/instagram.png');
const youtubeLogo = require('../../assets/youtube.png');

const windowWidth = (Dimensions.get('window').width) / 4;

const MissionsTab = () => (<Text style={styles.testText}>Missions</Text>);
const PinsTab = () => (<Text style={styles.testText}>Pins</Text>);

const renderScene = SceneMap({
  posts: PostsTab,
  missions: MissionsTab,
  pins: PinsTab,
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
      labelProps.focused ? { color: Colors.accentPurple, fontWeight: 'bold' } : { color: 'white' },
    ]}
    >
      {labelProps.route.title}
    </Text>
  </View>

);

const renderTabBar = (props) => (
  <TabBar
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    scrollEnabled
    indicatorStyle={{ backgroundColor: Colors.accentPurple }}
    style={{
      backgroundColor: Colors.bgPrimary,
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
  const [text, onChangeText] = useState('');
  const [workaround, changeWorkAround] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [routes] = useState([
    { key: 'posts', title: 'Posts' },
    { key: 'missions', title: 'Missions' },
    { key: 'pins', title: 'Pins' },
    { key: 'badges', title: 'Badges' },
  ]);

  const renderEditButton = (edit) => {
    if (!edit) {
      return (
        <TouchableOpacity style={styles.logoutButtonContainer} onPress={() => { setModalVisible(true); setEditing(true); }}>
          <Text style={styles.logoutButton}>Edit</Text>
        </TouchableOpacity>
      );
    } else {
      if (workaround === 0) {
        onChangeText(user.bio);
        changeWorkAround(1);
      }
      const userdata = {
        bio: text,
      };
      return (
        <Modal
          animationType="slide"
          visible={modalVisible}
          transparent={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
            setEditing(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.header}>

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => { setModalVisible(!modalVisible); setEditing(false); props.editUser(userdata); }}
                >
                  <View style={styles.imagesIcon}>
                    <FontAwesomeIcon icon={faTimes} size={40} color="white" />
                  </View>
                </Pressable>
              </View>
              <TextInput
                style={{ height: 70, backgroundColor: 'white', margin: 10 }}
                onChangeText={onChangeText}
                value={text}
                multiline
              />
            </View>
          </View>
        </Modal>
      );
    }
  };

  useEffect(() => {
    props.getUser();
  }, []);

  const blankProfile = 'https://res.cloudinary.com/djc5u8rjt/image/upload/v1621833029/ux9xmvmtjl3nf7x7ls2n.png';
  const profileUrl = user.profilePhoto ? user.profilePhoto : blankProfile;

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
          onPress={() => Linking.openURL('https://www.youtube.com/channel/UCSzN7Vl0SwahaxAqHpx5tng')}
        >
          Instagram
        </Text>
        <Image style={styles.socialsLogo} source={youtubeLogo} />
        <Text style={styles.socialsText}
          onPress={() => Linking.openURL('https://www.youtube.com/channel/UCSzN7Vl0SwahaxAqHpx5tng')}
        >
          Youtube

        </Text>
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
  header: {
    backgroundColor: Colors.bgSecondary,
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
    backgroundColor: Colors.bgTertiary,
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
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.bgPrimary,
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
    maxWidth: '100%',
    marginTop: 20,
  },
});

const mapStateToProps = (state) => ({
  user: state.user.userData,
});

export default connect(mapStateToProps, { getUser, signOutUser, editUser })(ProfileScreen);
