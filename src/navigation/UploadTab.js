import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
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
    </Stack.Navigator>
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

export default connect(mapStateToProps, { createPost })(UploadTab);
