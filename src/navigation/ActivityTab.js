import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OngoingActivityScreen from '../screens/OngoingActivityScreen';
import NewActivityScreen from '../screens/NewActivityScreen';
import { bgTertiary, bgPrimary } from '../constants/colors';
import ChangeLocationScreen from '../screens/ChangeLocationScreen';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const MissionTab = () => {
  return (
    <Tab.Navigator
      swipeEnabled={false}
      tabBarOptions={{
        style: styles.tabBar,
        activeTintColor: 'black',
        inactiveTintColor: 'white',
        indicatorStyle: styles.tabBarIndicator,
        labelStyle: {
          fontSize: 11,
          textTransform: 'none',
        },
      }}
    >
      <Tab.Screen name="New" component={NewActivityScreen} />
      <Tab.Screen name="Ongoing" component={OngoingActivityScreen} />
    </Tab.Navigator>
  );
};

const ActivityTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MissionTab" component={MissionTab} options={{ headerShown: false }} />
      <Stack.Screen
        name="ChangeLocationScreen"
        component={ChangeLocationScreen}
        options={() => ({
          title: '',
          headerStyle: {
            backgroundColor: bgPrimary,
            shadowOffset: { height: 0, width: 0 }, // Gets rid of white line underneath
          },
          headerTintColor: '#fff',
          headerTitleStyle: { fontSize: 25 },
          headerTitleAlign: 'left',
        })}
      />
    </Stack.Navigator>
  );
};

export default ActivityTab;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    top: 60,
    width: 190,
    height: 48,
    alignSelf: 'center',
    borderRadius: 100,
    backgroundColor: bgTertiary,
  },

  tabBarIndicator: {
    backgroundColor: 'white',
    height: 48,
    borderColor: bgTertiary,
    borderWidth: 4,
    borderRadius: 100,
  },
});
