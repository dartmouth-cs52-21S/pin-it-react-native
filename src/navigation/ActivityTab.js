import React, { useEffect } from 'react';
import { StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import OngoingActivityScreen from '../screens/OngoingActivityScreen';
import NewActivityScreen from '../screens/NewActivityScreen';
import CameraScreen from '../screens/CameraScreen';
import { PostCreationScreen } from '../screens/upload';
import { bgTertiary, bgPrimary } from '../constants/colors';
import { createPost, updateCurrentPost } from '../actions/posts';
import { getCurrentPost } from '../selectors/posts';
import { getCurrentLocation } from '../services/locationService';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const onCreatePost = (props, navigation) => {
  if (!props.post?.location) return;
  props.createPost(props.post, () => navigation.navigate('MainActivityScreen'));
};

const ActivityStack = (props) => {
  useEffect(() => {
    getCurrentLocation((location) => {
      updateCurrentPost({ ...props.post, location });
    });
  });

  return (
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
          headerTintColor: '#fff',
          headerTitleStyle: { fontSize: 25 },
          headerTitleAlign: 'center',
          headerRight: () => (<Button title="Submit" onPress={() => onCreatePost(props, navigation)} />),
        })}
      />
    </Stack.Navigator>
  );
};

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
  const post = getCurrentPost(state);

  return {
    post: {
      ...post,
      isMission: true,
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
