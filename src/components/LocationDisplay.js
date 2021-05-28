import React from 'react';
import { connect } from 'react-redux';
import {
  Text, View, StyleSheet, TouchableOpacity,
} from 'react-native';
import { bgTertiary } from '../constants/colors';
import { getLocation } from '../selectors/app';

const LocationDisplay = (props) => {
  const { address, handlePress, containerStyle } = props;
  return (
    <TouchableOpacity style={[styles.container, containerStyle]} onPress={handlePress}>
      <View style={styles.icon}>
        <Text>📍</Text>
      </View>
      <Text style={styles.text} numberOfLines={1}>{address || 'No location available'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgTertiary,
    borderRadius: 10,
    paddingTop: 8,
    paddingBottom: 8,
    padding: 10,
    color: 'white',
    width: '90%',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '8%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    width: '92%',
  },
});

const mapStateToProps = (state) => ({
  address: getLocation(state)?.address,
});

export default connect(mapStateToProps, null)(LocationDisplay);
