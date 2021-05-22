/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Host } from 'react-native-portalize';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faDice, faUser } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import ProfileTab from './ProfileTab';
import HomeTab from './HomeTab';
import SignUpTab from './SignUpTab';
import ActivityTab from './ActivityTab';

const Tab = createBottomTabNavigator();

const MainTabBar = (props) => {
  const icons = {
    Home: faHome,
    Activity: faDice,
    Profile: faUser,
    SignUp: faUser,
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
          {props.authenticated === false ? (
            <Tab.Screen name="SignUp" component={SignUpTab} />
          ) : (
            <>
              <Tab.Screen name="Home" component={HomeTab} />
              <Tab.Screen name="Activity" component={ActivityTab} />
              <Tab.Screen name="Profile" component={ProfileTab} />
            </>
          )}
        </Tab.Navigator>
      </Host>
    </NavigationContainer>
  );
};

const mapStateToProps = (reduxState) => ({
  authenticated: reduxState.auth.authenticated,
});

export default connect(mapStateToProps, null)(MainTabBar);
