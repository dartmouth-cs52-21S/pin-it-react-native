import React from 'react';
import {
  View, StyleSheet, Image,
} from 'react-native';
// import { bgTertiary } from '../constants/colors';

const BadgeTile = (props) => {
  const {
    title, iconUrl,
  // eslint-disable-next-line react/destructuring-assignment
  } = props;

  return (
    <View>
      {title}
      {' '}
      <Image
        style={styles.Image}
        source={iconUrl}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
});

export default BadgeTile;
