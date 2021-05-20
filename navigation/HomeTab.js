import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FeedScreen from '../screens/FeedScreen';

const Stack = createStackNavigator();

// nest stack navigator to handle two internal views
// "name" prop is the name of the route
const HomeTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FeedScreen"
        component={FeedScreen}
        options={{
          title: 'feed',
          headerStyle: {
            backgroundColor: '#349eeb',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeTab;
