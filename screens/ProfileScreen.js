import React from 'react';
import {
  View, Button,
} from 'react-native';
import { connect } from 'react-redux';
import { signOutUser } from '../actions/index';

const ProfileScreen = (props) => {
  return (
    <View>
      <Button title="Log Out" onPress={() => props.signOutUser()} />
    </View>
  );
};

export default connect(null, { signOutUser })(ProfileScreen);
