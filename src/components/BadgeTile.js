import React from 'react';
import {
  Image, View, Text, StyleSheet,
} from 'react-native';
import * as Colors from '../constants/colors';
import fontStyles from '../constants/fonts';

const BadgeTile = ({ badge }) => {
  const { title, iconUrl, dateEarned } = badge;

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer]}>
        <Image
          style={styles.image}
          source={{ uri: iconUrl }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={fontStyles.mediumTextBold} numberOfLines={1}>
          {title}
        </Text>
        <Text style={fontStyles.mediumTextRegular} numberOfLines={1}>
          {`Earned on ${new Date(dateEarned).toDateString().slice(0, -4)}`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgSecondary,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '95%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  iconContainer: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    width: '30%',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    paddingVertical: 30,
    marginRight: 15,
    width: '60%',
  },
  image: {
    width: '70%',
    height: undefined,
    aspectRatio: 1,
  },
});

export default BadgeTile;
