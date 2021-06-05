import React, { useState } from 'react';
import {
  View,
  TextInput, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { displayToast } from '../actions/app';
import { signInUser, signUpUser } from '../actions/auth';
import {
  bgPrimary, bgTertiary, accentPink,
} from '../constants/colors';

const Auth = (props) => {
  const { navigation, authType } = props;

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const renderUsername = () => {
    if (authType === 'signUp') {
      return (
        <View style={styles.userEntry}>
          <FontAwesomeIcon icon={faUser} size={26} color={bgTertiary} />
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            value={username}
            onChangeText={(text) => setUsername(text)}
            placeholder="Username"
            type="username"
            placeholderTextColor="grey"
          />
        </View>
      );
    } else {
      return (null);
    }
  };

  const renderPassword2 = () => {
    if (authType === 'signUp') {
      return (
        <View style={styles.userEntry}>
          <FontAwesomeIcon icon={faLock} size={28} color={bgTertiary} />
          <TextInput
            style={styles.textInput}
            value={password2}
            onChangeText={(text) => setPassword2(text)}
            placeholder="Password"
            type="password"
            autoCapitalize="none"
            placeholderTextColor="grey"
            secureTextEntry
          />
        </View>
      );
    } else {
      return (null);
    }
  };

  const validator = () => {
    if (email.length > 0 && password.length > 0 && username.length > 0 && password === password2) {
      props.signUpUser({ email, password, username });
    } else {
      displayToast('error', 'Sign in failed', 'Fill all fields and match passwords');
    }
  };

  const renderButtons = () => {
    if (authType === 'signIn') {
      return (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.signInUser({ email, password })}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.changeTab}>
            <Text>I&apos;m new here!  </Text>
            <Text style={styles.link}
              onPress={() => { navigation.navigate('SignUpScreen'); }}
            >
              Sign up
            </Text>
          </Text>
        </>
      );
    } else if (authType === 'signUp') {
      return (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={validator}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
          <Text style={styles.changeTab}>
            <Text>I already have an account.  </Text>
            <Text style={styles.link}
              onPress={() => { navigation.navigate('SignInScreen'); }}
            >
              Sign in
            </Text>
          </Text>
        </>
      );
    } else {
      return (null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Not Pin-It</Text>
      </View>
      <View style={styles.footer}>
        {renderUsername()}
        <View style={styles.userEntry}>
          <FontAwesomeIcon icon={faEnvelope} size={28} color={bgTertiary} />
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
            type="email"
            placeholderTextColor="grey"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.userEntry}>
          <FontAwesomeIcon icon={faLock} size={28} color={bgTertiary} />
          <TextInput
            style={styles.textInput}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            type="password"
            autoCapitalize="none"
            placeholderTextColor="grey"
            secureTextEntry
          />
        </View>
        {renderPassword2()}
        {renderButtons()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgPrimary,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
  footer: {
    flex: 3,
    alignItems: 'center',
  },
  userEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    paddingVertical: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  textInput: {
    width: '80%',
    paddingVertical: 3,
    paddingHorizontal: 5,
    marginLeft: 10,
    color: 'white',
    borderRadius: 5,
  },
  link: {
    color: accentPink,
    fontWeight: 'bold',
  },
  changeTab: {
    marginTop: 20,
    color: 'grey',
  },
  button: {
    alignItems: 'center',
    backgroundColor: accentPink,
    marginTop: 20,
    paddingVertical: 10,
    width: '80%',
    borderRadius: 15,
  },
  buttonText: {
    color: '#DDDDDD',
  },
});

export default connect(null, { signInUser, signUpUser })(Auth);
