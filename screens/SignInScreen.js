import React, { useState } from 'react';
import {
  View,
  TextInput, Button, Text, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { signInUser } from '../actions/index';

const SignInScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput style={styles.textInput} value={email} onChangeText={(text) => setEmail(text)} />
      <Text>Password</Text>
      <TextInput style={styles.textInput} value={password} onChangeText={(text) => setPassword(text)} />
      <Button title="Submit" onPress={() => props.signInUser({ email, password })} />
      <Button title="Sign Up" onPress={() => props.navigation.navigate('SignUpScreen')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 10,
    backgroundColor: '#d3d3d3',
  },
  textInput: {
    width: '80%',
    height: 40,
    margin: 10,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
});

export default connect(null, { signInUser })(SignInScreen);
