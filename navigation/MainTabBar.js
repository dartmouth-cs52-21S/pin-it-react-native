import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import ProfileTab from './ProfileTab';
import HomeTab from './HomeTab';
import ActivityTab from './ActivityTab';

const Tab = createBottomTabNavigator();

const MainTabBar = () => {
  const icons = {
    Home: 'home',
    Activity: 'cube',
    Profile: 'user',
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Search"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            return <Ionicons name={icons[route.name]} size={26} color={focused ? '#58AADA' : 'grey'} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeTab} />
        <Tab.Screen name="Activity" component={ActivityTab} />
        <Tab.Screen name="Profile" component={ProfileTab} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainTabBar;
