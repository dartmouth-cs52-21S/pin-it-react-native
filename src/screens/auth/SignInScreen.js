import React from 'react';
import Auth from '../../components/Auth';

const SignInScreen = (props) => {
  const { navigation } = props;
  return (
    <Auth authType="signIn" navigation={navigation} />
  );
};

export default SignInScreen;
