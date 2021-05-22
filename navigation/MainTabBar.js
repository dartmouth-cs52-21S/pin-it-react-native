import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Host } from 'react-native-portalize';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faDice, faUser } from '@fortawesome/free-solid-svg-icons';
import ProfileTab from './ProfileTab';
import HomeTab from './HomeTab';
import ActivityTab from './ActivityTab';

const Tab = createBottomTabNavigator();

const MainTabBar = () => {
  const icons = {
    Home: faHome,
    Activity: faDice,
    Profile: faUser,
  };

  return (
    <NavigationContainer>
      <Host>
        <Tab.Navigator
          initialRouteName="Search"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              return <FontAwesomeIcon icon={icons[route.name]} size={26} color={focused ? '#58AADA' : 'grey'} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeTab} />
          <Tab.Screen name="Activity" component={ActivityTab} />
          <Tab.Screen name="Profile" component={ProfileTab} />
        </Tab.Navigator>
      </Host>
    </NavigationContainer>
  );
};

export default MainTabBar;
