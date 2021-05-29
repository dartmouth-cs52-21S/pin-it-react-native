import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import categories from '../constants/categories';

const LocationHeader = (props) => {
  const {
    location: {
      category, title, latitude, longitude,
    },
    // eslint-disable-next-line react/destructuring-assignment
  } = props;

  const renderIcon = () => {
    const { icon, style } = categories[category] || {};

    if (!icon) return (null);
    return (
      <View style={[styles.iconContainer, style]}>
        <FontAwesomeIcon icon={icon} size={23} color="white" />
      </View>
    );
  };

  return (
    <View>
      <View style={styles.heading}>
        <Text numberOfLines={1} style={styles.title}>
          @
          {' '}
          {title}
        </Text>
        {renderIcon()}
      </View>

      <View style={styles.subheading}>
        <Text style={styles.detail}>
          Location:
          {' '}
          {latitude}
          ,
          {' '}
          {longitude}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 20,
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
    fontSize: 12,
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
