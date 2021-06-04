/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faUser,
  faDice,
  faPlusCircle,
  faChartBar,
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import HomeTab from './HomeTab';
import LeaderboardTab from './LeaderboardTab';
import ActivityStack from './ActivityTab';
import UploadTab from './UploadTab';
import ProfileTab from './ProfileTab';
import {
  bgPrimary, bgSecondary, accentPurple,
} from '../constants/colors';
import { getCurrentLocation } from '../services/locationService';
import { setCurrentLocation } from '../actions/locations';

const Tab = createBottomTabNavigator();

const MainTabBar = (props) => {
  const solidIcons = {
    Home: faHome,
    Leaderboard: faChartBar,
    Activity: faDice,
    Upload: faPlusCircle,
    Profile: faUser,
  };

  useEffect(() => {
    getCurrentLocation((place) => {
      const curr = { latitude: place.latitude, longitude: place.longitude };
      props.setCurrentLocation(curr);
    });
  });

  return (
    <Tab.Navigator
      initialRouteName="Search"
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: bgPrimary,
          borderTopWidth: 0.5,
          borderTopColor: bgSecondary,
          height: '10%',
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          return <FontAwesomeIcon icon={solidIcons[route.name]} size={26} color={focused ? accentPurple : 'grey'} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeTab} />
      <Tab.Screen name="Leaderboard" component={LeaderboardTab} />
      <Tab.Screen name="Activity" component={ActivityStack} />
      <Tab.Screen name="Upload" component={UploadTab} />
      <Tab.Screen name="Profile" component={ProfileTab} />
    </Tab.Navigator>
  );
};

export default connect(null, { setCurrentLocation })(MainTabBar);
