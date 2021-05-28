import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ChangeLocationScreen from '../screens/ChangeLocationScreen';
import { PostCreationScreen, UploadScreen } from '../screens/upload';
import { bgPrimary } from '../constants/colors';
import { createPost } from '../actions/posts';
import { getLocation } from '../selectors/app';
import { getCurrentPost } from '../selectors/posts';

const Stack = createStackNavigator();

const UploadTab = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UploadScreen"
        component={UploadScreen}
        options={{
          title: 'New Post',
          headerStyle: {
            backgroundColor: bgPrimary,
            shadowOffset: { height: 0, width: 0 }, // Gets rid of white line underneath
          },
          headerTintColor: '#fff',
          headerTitleStyle: { fontSize: 25 },
          headerTitleAlign: 'left',
        }}
      />
      <Stack.Screen
        name="PostCreationScreen"
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
          headerRight: () => (<Button title="Submit" onPress={() => props.createPost(props.post, () => navigation.navigate('UploadScreen'))} />),
        })}
      />
      <Stack.Screen
        name="ChangeLocationScreen"
        component={ChangeLocationScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: bgPrimary,
            shadowOffset: { height: 0, width: 0 }, // Gets rid of white line underneath
          },
          headerTintColor: '#fff',
          headerTitleStyle: { fontSize: 25 },
          headerTitleAlign: 'left',
        }}
      />
    </Stack.Navigator>
  );
};

const mapStateToProps = (state) => {
  const {
    address, latitude, longitude, placeId,
  } = getLocation(state);
  const { imageUrl, caption, category } = getCurrentPost(state);

  return {
    post: {
      imageUrl,
      caption,
      location: {
        title: address,
        latitude,
        longitude,
        placeId,
        category,
      },
    },
  };
};

export default connect(mapStateToProps, { createPost })(UploadTab);
