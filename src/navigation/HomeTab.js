import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FeedScreen from '../screens/FeedScreen';
import GridScreen from '../screens/GridScreen';
import { bgPrimary } from '../constants/colors';
import fontStyles from '../constants/fonts';
import OtherProfileScreen from '../screens/otherUser/OtherProfileScreen';
import PinsLocationFeedScreen from '../screens/PinsLocationFeedScreen';

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
          title: 'Explore',
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
        name="GridScreen"
        component={GridScreen}
        options={{
          title: '',
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
        name="OtherProfileScreen"
        component={OtherProfileScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: bgPrimary,
            shadowOffset: { height: 0, width: 0 }, // Gets rid of white line underneath
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="PinsLocationFeedScreen"
        component={PinsLocationFeedScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: bgPrimary,
            shadowOffset: { height: 0, width: 0 }, // Gets rid of white line underneath
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeTab;
