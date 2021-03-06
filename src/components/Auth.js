import React, { useState } from 'react';
import {
  View,
  KeyboardAvoidingView, Platform, TextInput, Text, StyleSheet, TouchableOpacity, Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { displayToast } from '../actions/app';
import { signInUser, signUpUser } from '../actions/auth';
import {
  bgTertiary, accentPurple, bgPrimary,
} from '../constants/colors';

const logo = require('../assets/logo.png');

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
            placeholder="Confirm Password"
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
            <Text style={styles.buttonText}>I&apos;m new here!  </Text>
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
            <Text style={styles.buttonText}>I already have an account.  </Text>
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
    <LinearGradient
      style={styles.backgroundImage}
      colors={[bgPrimary, accentPurple]}
        // Gradient starts 50% from the left
        // and 70% from the top
      start={{ x: 0.5, y: 0.6 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container,
          (authType === 'signIn')
            ? { marginBottom: '55%' } : {}]}
      >
        <View style={[styles.inner,
          (authType === 'signIn')
            ? { justifyContent: 'flex-end' }
            : { justifyContent: 'space-around', paddingBottom: '20%' },
        ]}

        >
          <View style={styles.footer}>
            <Image source={logo} style={styles.logo} />
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
      </KeyboardAvoidingView>
    </LinearGradient>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  logo: {
    width: 200,
    height: 200,
  },
  footer: {
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
  inner: {
    flex: 1,
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
    color: accentPurple,
    fontWeight: 'bold',
  },
  changeTab: {
    marginTop: 20,
    color: 'grey',
  },
  button: {
    alignItems: 'center',
    backgroundColor: accentPurple,
    marginTop: 20,
    paddingVertical: 10,
    width: '80%',
    borderRadius: 15,
  },
  buttonText: {
    color: '#DED9FF',
  },
});

export default connect(null, { signInUser, signUpUser })(Auth);
