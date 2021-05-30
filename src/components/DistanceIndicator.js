import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import * as Colors from '../constants/colors';

const DistanceIndicator = (props) => {
  const {
    mission, distance, position, onCancel,
  } = props;
  return (
    <View style={[styles.container, position]}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>
          Going to
          {' '}
          {mission.location.title}
        </Text>
        <Text style={styles.subtitleText}>
          Distance Left:
          {' '}
          {distance}
          {' '}
          miles
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
          <Text>Cancel</Text>
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
    paddingVertical: 10,
  },

  textContainer: {
    width: '60%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20,
  },

  titleText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },

  subtitleText: {
    color: 'white',
    fontSize: 16,
  },

  buttonContainer: {
    width: '40%',
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
