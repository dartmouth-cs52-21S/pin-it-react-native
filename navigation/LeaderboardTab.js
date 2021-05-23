import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import { bgPrimary } from '../constants/colors';

const Stack = createStackNavigator();

const LeaderboardTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LeaderboardScreen"
        component={LeaderboardScreen}
        options={{
          title: 'Leaderboard',
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

export default LeaderboardTab;
