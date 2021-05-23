import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import UploadScreen from '../screens/UploadScreen';
import { bgPrimary } from '../constants/colors';

const Stack = createStackNavigator();

const UploadTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UploadScreen"
        component={UploadScreen}
        options={{
          title: 'New Post',
          headerStyle: {
            backgroundColor: bgPrimary,
            shadowOffset: { height: 0, width: 0 }, // Gets rid of white line underneath
          },
          headerTintColor: '#fff',
          headerTitleStyle: { fontSize: 25 },
          headerTitleAlign: 'left',
        }}
      />
    </Stack.Navigator>
  );
};

export default UploadTab;
