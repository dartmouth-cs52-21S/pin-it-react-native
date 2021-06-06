import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import * as Colors from '../constants/colors';
import fontStyles from '../constants/fonts';

const DistanceIndicator = (props) => {
  const {
    mission, distance, position, onCancel,
  } = props;
  return (
    <View style={[styles.container, position]}>
      <View style={styles.textContainer}>
        <Text style={[styles.titleText, fontStyles.mediumTextRegular]} numberOfLines={1}>
          Going to
          {' '}
          {mission.location.title}
        </Text>
        <Text style={fontStyles.smallMediumText}>
          Distance Left:
          {' '}
          {distance}
          {' '}
          miles
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
          <Text style={fontStyles.mediumTextBold}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DistanceIndicator;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    backgroundColor: Colors.bgPrimary,
    paddingVertical: 15,
  },
  textContainer: {
    width: '65%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  titleText: {
    marginBottom: 10,
  },
  buttonContainer: {
    width: '35%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    width: '60%',
    height: 40,
    backgroundColor: Colors.accentPurple,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
