import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as Colors from '../constants/colors';
import fontStyles from '../constants/fonts';
import categories from '../constants/categories';

const MissionCard = ({ mission, onPress }) => {
  const { icon, style: iconStyle } = categories[mission.category];

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[iconStyle, styles.iconContainer]}>
        <FontAwesomeIcon icon={icon} size={26} color="white" />
      </View>
      <View style={styles.textContainer}>
        <Text style={fontStyles.mediumTextBold} numberOfLines={1}>
          {mission.title}
        </Text>
        <Text style={fontStyles.mediumTextRegular} numberOfLines={1}>
          {mission.category}
        </Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={fontStyles.mediumTextRegular}>
          {`${0} mins  👟`}
        </Text>
        <Text style={fontStyles.mediumTextRegular}>
          {`${0} mins  🚗`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgSecondary,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '90%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  iconContainer: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    width: 70,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    paddingVertical: 30,
    marginRight: 15,
    flexGrow: 1,
    width: '40%',
  },
  detailsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
});

export default MissionCard;
