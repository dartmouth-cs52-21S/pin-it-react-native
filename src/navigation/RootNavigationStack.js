import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';
import { Host } from 'react-native-portalize';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import * as Location from 'expo-location';
import { SignInScreen, SignUpScreen } from '../screens/auth';
import { bgPrimary } from '../constants/colors';
import MainTabBar from './MainTabBar';
import { setLocPermissionGranted } from '../actions/app';

const Stack = createStackNavigator();

const RootNavigationStack = (props) => {
  const { authenticated } = props;

  const checkLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync(); // location permission status

    if (status !== 'granted') {
      props
        .setLocPermissionGranted(false);
    }
  };

  useEffect(() => {
    checkLocationPermission();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: bgPrimary }}>
      <NavigationContainer>
        <Host>
          <Stack.Navigator>
            {authenticated
            // If authenticated, show main tabs
              ? (
                <Stack.Screen name="Main" component={MainTabBar} options={{ headerShown: false }} />
              )
            // If not authenticated, show authentication screens
              : (
                <>
                  <Stack.Screen name="SignInScreen"
                    component={SignInScreen}
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
                  <Stack.Screen name="SignUpScreen"
                    component={SignUpScreen}
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
                </>
              )}
          </Stack.Navigator>
        </Host>
      </NavigationContainer>
    </View>
  );
};

const mapStateToProps = (reduxState) => ({
  authenticated: reduxState.auth.authenticated,
});

const mapDispatchToProps = {
  setLocPermissionGranted,
};

export default connect(mapStateToProps, mapDispatchToProps)(RootNavigationStack);
