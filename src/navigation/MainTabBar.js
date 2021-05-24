/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHome, faDice, faUser, faPlusCircle, faChartBar,
} from '@fortawesome/free-solid-svg-icons';
import HomeTab from './HomeTab';
import LeaderboardTab from './LeaderboardTab';
import ActivityTab from './ActivityTab';
import UploadTab from './UploadTab';
import ProfileTab from './ProfileTab';

const Tab = createBottomTabNavigator();

const MainTabBar = (props) => {
  const icons = {
    Home: faHome,
    Leaderboard: faChartBar,
    Activity: faDice,
    Upload: faPlusCircle,
    Profile: faUser,
  };

  return (
    <Tab.Navigator
      initialRouteName="Search"
      tabBarOptions={{
        showLabel: false,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          return <FontAwesomeIcon icon={icons[route.name]} size={26} color={focused ? '#58AADA' : 'grey'} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeTab} />
      <Tab.Screen name="Leaderboard" component={LeaderboardTab} />
      <Tab.Screen name="Activity" component={ActivityTab} />
      <Tab.Screen name="Upload" component={UploadTab} />
      <Tab.Screen name="Profile" component={ProfileTab} />
    </Tab.Navigator>
  );
};

export default MainTabBar;
