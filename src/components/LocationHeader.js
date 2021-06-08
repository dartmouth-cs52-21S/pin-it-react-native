import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import categories from '../constants/categories';

const LocationHeader = (props) => {
  const { location } = props;
  const {
    category, title, address,
  } = location || {};

  const renderIcon = () => {
    const { icon, style } = categories[category] || {};

    if (!icon) return (null);
    return (
      <View style={[styles.iconContainer, style]}>
        <FontAwesomeIcon icon={icon} size={23} color="white" />
      </View>
    );
  };

  const renderAddress = () => {
    if (address) {
      const addressarray = address.split(',');
      const state2 = addressarray[2];
      const state = String(state2).split(' ');
      if (state2 !== undefined) {
        return (
          <Text style={styles.detail} numberOfLines={1}>
            {addressarray[0]}
            ,
            {addressarray[1]}
            ,
            {' '}
            {state[1]}
          </Text>
        );
      } else {
        return (
          <Text style={styles.detail} numberOfLines={1}>
            {addressarray[0]}
            ,
            {' '}
            {addressarray[1]}
          </Text>
        );
      }
    } else {
      return (
        <Text style={styles.detail} numberOfLines={1}>
          {' '}
        </Text>
      );
    }
  };

  return (
    <View>
      <View style={styles.heading}>
        <Text numberOfLines={1} style={styles.title}>
          {' '}
          {title}
        </Text>
        {renderIcon()}
      </View>

      <View style={styles.subheading}>
        {renderAddress()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    width: '80%',
  },
  heading: {
    flexDirection: 'row',
    flex: 0,
    justifyContent: 'space-between',
  },
  subheading: {
    flexDirection: 'row',
  },

  detail: {
    fontSize: 13,
    color: 'white',
  },
  iconContainer: {
    backgroundColor: '#2CA8C7',
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 10,
  },
});

export default LocationHeader;
