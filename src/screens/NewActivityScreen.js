import React, { useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import { bgPrimary } from '../constants/colors';
import NewMissionModal from '../components/NewMissionModal';
import { generateMission } from '../services/missionService';

const NewActivityScreen = (props) => {
  const modalizeRef = useRef(null);

  const onMarkerPress = (e) => {
    console.log('pressed');
  };

  const onModalPress = (e) => {
    modalizeRef.current?.open();
  };

  const onSubmit = async (latitude, longitude, radius, query) => {
    const data = await generateMission(latitude, longitude, radius, query);
    console.log(data);
  };

  return (
    <View syle={styles.container}>
      <MapView
        style={{ width: '100%', height: '100%', zIndex: -1 }}
      >
        <Marker coordinate={{ latitude: 43.7044, longitude: -72.2887 }}
          onPress={onMarkerPress}
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.newActivityButton} onPress={onModalPress}>
          <Text style={styles.buttonText}>🎲 Generate New Mission</Text>
        </TouchableOpacity>
        <Portal>
          <Modalize ref={modalizeRef}
            modalHeight={500}
            modalStyle={{ backgroundColor: bgPrimary }}
          >
            <NewMissionModal onSubmit={onSubmit} />
          </Modalize>
        </Portal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 40,
    margin: 'auto',
    height: 50,
    right: 0,
    left: 0,
    zIndex: 1,
  },
  newActivityButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: 260,
    backgroundColor: bgPrimary,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
});

export default NewActivityScreen;
