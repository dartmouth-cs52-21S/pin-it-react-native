import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import categories from '../constants/categories';
import * as Colors from '../constants/colors';

const MissionDisplay = ({ mission, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.iconContainer, categories[mission.category].style]}>
        <FontAwesomeIcon icon={categories[mission.category].icon} size={26} color="white" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{mission.title}</Text>
        <Text style={styles.categoryText}>{mission.category}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MissionDisplay;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 90,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: Colors.bgTertiary,
    marginBottom: 15,
    alignSelf: 'center',
  },

  iconContainer: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  textContainer: {
    width: '80%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 20,
  },

  titleText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '700',
  },

  categoryText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '300',
  },
});
