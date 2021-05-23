import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { PostEditingScreen, UploadScreen } from '../screens/upload';
import { bgPrimary } from '../constants/colors';

const Stack = createStackNavigator();

const UploadTab = () => {
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
        name="PostEditingScreen"
        component={PostEditingScreen}
        options={({ navigation }) => ({
          title: 'New Post',
          headerStyle: {
            backgroundColor: bgPrimary,
            shadowOffset: { height: 0, width: 0 },
          },
          headerTintColor: '#fff',
          headerTitleStyle: { fontSize: 25 },
          headerTitleAlign: 'center',
          headerRight: () => (<Button title="Next" onPress={() => navigation.navigate('PostCreationScreen')} />),
        })}
      />
    </Stack.Navigator>
  );
};

export default UploadTab;
