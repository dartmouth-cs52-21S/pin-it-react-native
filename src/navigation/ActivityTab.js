import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OngoingActivityScreen from '../screens/OngoingActivityScreen';
import NewActivityScreen from '../screens/NewActivityScreen';
import { bgTertiary } from '../constants/colors';

const Tab = createMaterialTopTabNavigator();

const ActivityTab = () => {
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