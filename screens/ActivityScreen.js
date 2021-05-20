import React, { useState } from 'react';
import {
  View,
  TextInput, Button, Text, StyleSheet,
} from 'react-native';
import { getLocationInfo, createLocation } from '../services/LocationService';

const ActivityScreen = (props) => {
  const [lat, setLat] = useState('0');
  const [lng, setLng] = useState('0');
  const [info, setInfo] = useState('');

  const getInfo = async (latitude, longitude) => {
    const newInfo = await getLocationInfo(latitude, longitude);
    setInfo(newInfo);
    postLocation();
  };

  const postLocation = async () => {
    // eslint-disable-next-line camelcase
    const { place_id } = info;
    const title = info.address;
    const latitude = lat;
    const longitude = lng;
    const category = 'place';
    const response = await createLocation({
      place_id, title, latitude, longitude, category,
    });
    console.log(response);
  };

  return (
    <View style={styles.mainContainer}>
      <Text>Latitude</Text>
      <TextInput style={styles.textInput} value={lat} onChangeText={(text) => setLat(text)} />
      <Text>Longitude</Text>
      <TextInput style={styles.textInput} value={lng} onChangeText={(text) => setLng(text)} />
      <Button title="Submit" onPress={() => getInfo(lat, lng)} />
      <Text>
        {info?.address ? info.address : null}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  textInput: {
    width: '80%',
    height: 40,
    margin: 10,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
});

export default ActivityScreen;
