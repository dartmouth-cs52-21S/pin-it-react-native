import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const ProfileTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'username',
          headerStyle: {
            backgroundColor: '#349eeb',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileTab;
