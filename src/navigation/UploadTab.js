import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { PostCreationScreen, UploadScreen } from '../screens/upload';
import ImageProcess from '../services/imageProcess';
import { bgPrimary } from '../constants/colors';
import { createPost } from '../actions/posts';
import { getCurrentPost } from '../selectors/posts';
import fontStyles from '../constants/fonts';

const Stack = createStackNavigator();

const UploadTab = (props) => {
  const handlePostSubmit = (navigation) => {
    props.createPost(props.post, () => {
      navigation.navigate('UploadScreen', { uploadSuccessful: true });
    });
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UploadScreen"
        component={UploadScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: bgPrimary,
            shadowOffset: { height: 0, width: 0 }, // Gets rid of white line underneath
          },
          headerTintColor: '#fff',
          headerTitleStyle: fontStyles.smallHeaderTitle,
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
          headerBackTitle: 'Back',
          headerTintColor: '#fff',
          headerTitleStyle: { fontSize: 25 },
          headerTitleAlign: 'center',
          headerRight: () => (<Button title="Submit" onPress={() => handlePostSubmit(navigation)} />),
        })}
      />
      <Stack.Screen
        name="ImageProcess"
        component={ImageProcess}
        options={{
          title: 'Selected 0 files',
        }}
      />
    </Stack.Navigator>
  );
};

const mapStateToProps = (state) => ({
  post: getCurrentPost(state),
});

export default connect(mapStateToProps, { createPost })(UploadTab);
