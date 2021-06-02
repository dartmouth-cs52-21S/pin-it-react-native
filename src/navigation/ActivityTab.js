import React from 'react';
import { StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import OngoingActivityScreen from '../screens/OngoingActivityScreen';
import NewActivityScreen from '../screens/NewActivityScreen';
import CameraScreen from '../screens/CameraScreen';
import { PostCreationScreen } from '../screens/upload';
import { bgTertiary, bgPrimary } from '../constants/colors';
import { createPost } from '../actions/posts';
import { getLocation } from '../selectors/app';
import { getCurrentPost } from '../selectors/posts';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const ActivityStack = (props) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: bgPrimary,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
    }}
  >
    <Stack.Screen name="MainActivityScreen"
      component={ActivityTab}
      options={{ headerShown: false, title: 'Activities' }}
    />
    <Stack.Screen name="CameraScreen"
      component={CameraScreen}
      options={{
        headerTitleStyle: { color: 'white' },
        title: 'Camera',
      }}
    />
    <Stack.Screen name="PostCreationScreen"
      component={PostCreationScreen}
      options={({ navigation }) => ({
        title: 'New Post',
        headerStyle: {
          backgroundColor: bgPrimary,
          shadowOffset: { height: 0, width: 0 },
        },
        headerBackTitle: 'Cancel',
        headerTintColor: '#fff',
        headerTitleStyle: { fontSize: 25 },
        headerTitleAlign: 'center',
        headerRight: () => (<Button title="Submit" onPress={() => props.createPost(props.post, () => navigation.navigate('CameraScreen'))} />),
      })}
    />
  </Stack.Navigator>
);

const ActivityTab = () => {
  return (
    <Tab.Navigator
      swipeEnabled={false}
      tabBarOptions={{
        style: styles.tabBar,
        activeTintColor: 'black',
        inactiveTintColor: 'white',
        indicatorStyle: styles.tabBarIndicator,
        labelStyle: {
          fontSize: 11,
          textTransform: 'none',
        },
      }}
    >
      <Tab.Screen name="New" component={NewActivityScreen} />
      <Tab.Screen name="Ongoing" component={OngoingActivityScreen} />
    </Tab.Navigator>
  );
};

const mapStateToProps = (state) => {
  let location = getLocation(state);
  const { imageUrls, caption, category } = getCurrentPost(state);

  location = { ...location, category };

  return {
    post: {
      imageUrls,
      caption,
      location,
    },
  };
};

export default connect(mapStateToProps, { createPost })(ActivityStack);

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    top: 60,
    width: 190,
    height: 48,
    alignSelf: 'center',
    borderRadius: 100,
    backgroundColor: bgTertiary,
  },

  tabBarIndicator: {
    backgroundColor: 'white',
    height: 48,
    borderColor: bgTertiary,
    borderWidth: 4,
    borderRadius: 100,
  },
});
