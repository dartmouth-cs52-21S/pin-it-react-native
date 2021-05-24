import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { bgPrimary } from '../constants/colors';

import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const ProfileTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: bgPrimary,
            shadowOffset: { height: 0, width: 0 }, // Gets rid of white line underneath
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileTab;
