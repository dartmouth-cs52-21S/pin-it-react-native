import React from 'react';
import _ from 'lodash';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import categories from '../constants/categories';

const TagRow = (props) => {
  const { containerStyle, active, handleTagPressed } = props;

  const renderCategory = (value, key) => {
    const activeStyle = active && active.includes(key) ? styles.activeStyle : styles.inactiveStyle;

    return (
      <View key={`${key}Category`} style={activeStyle}>
        <TouchableOpacity style={[styles.icon, value.style]} onPress={() => handleTagPressed(key)}>
          <FontAwesomeIcon icon={value.icon} size={26} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {_.map(categories, (value, key) => renderCategory(value, key))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  icon: {
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 15,
  },
  inactiveStyle: {
    opacity: 0.6,
  },
  activeStyle: {
    opacity: 1,
  },
});

export default TagRow;
