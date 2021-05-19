/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const VideoList = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Video Screen here
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgb(240,240,240)',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
});

export default VideoList;
