import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ActivityScreen from '../screens/ActivityScreen';

const Stack = createStackNavigator();

const ActivityTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ActivityScreen"
        component={ActivityScreen}
        options={{
          title: 'activity',
          headerStyle: {
            backgroundColor: '#349eeb',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
};

export default ActivityTab;
