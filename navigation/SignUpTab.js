import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignUpScreen from '../screens/SignUpScreen';

import SignInScreen from '../screens/SignInScreen';
import { bgPrimary } from '../constants/colors';

const Stack = createStackNavigator();

// nest stack navigator to handle two internal views
// "name" prop is the name of the route
const SignUpTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          title: 'Sign In',
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
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          title: 'Sign Up',
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

export default SignUpTab;
