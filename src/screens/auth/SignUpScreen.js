import React from 'react';
import Auth from '../../components/Auth';

const SignUpScreen = (props) => {
  const { navigation } = props;
  return (
    <Auth authType="signUp" navigation={navigation} />
  );
};

export default SignUpScreen;
