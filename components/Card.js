import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';

const Card = (props) => {
  const { title, latitude, longitude } = props;
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>
        Latitude:
        {' '}
        {latitude}
      </Text>
      <Text style={styles.subtitle}>
        Longitude:
        {' '}
        {longitude}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#d3d3d3',
    paddingHorizontal: 20,
    paddingVertical: 200,
    marginVertical: 8,
    marginHorizontal: 40,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 12,
  },
});

export default Card;
