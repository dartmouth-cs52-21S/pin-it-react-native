import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import { bgPrimary } from '../constants/colors';
import fontStyles from '../constants/fonts';

const Stack = createStackNavigator();

const LeaderboardTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LeaderboardScreen"
        component={LeaderboardScreen}
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
    </Stack.Navigator>
  );
};

export default LeaderboardTab;
