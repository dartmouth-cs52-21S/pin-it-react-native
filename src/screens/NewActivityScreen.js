import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import { bgPrimary } from '../constants/colors';
import NewMissionModal from '../components/NewMissionModal';
import { getLocation } from '../selectors/app';

const NewActivityScreen = (props) => {
  const modalizeRef = useRef(null);

  useEffect(() => console.log(props));

  // eslint-disable-next-line react/destructuring-assignment
  console.log(props?.route);
  // eslint-disable-next-line react/destructuring-assignment
  const { modalOpen } = props?.route?.params || {};

  useEffect(() => {
    console.log(modalOpen);
    if (modalOpen) {
      console.log(modalOpen);
      modalizeRef.current?.open();
    }
  },
  // eslint-disable-next-line react/destructuring-assignment
  [props?.route?.params?.modalOpen]);

  const onMarkerPress = (e) => {
    console.log('pressed');
  };

  const onModalPress = (e) => {
    modalizeRef.current?.open();
  };

  const handleChangeLocation = () => {
    modalizeRef.current?.close();
    props.navigation.navigate('ChangeLocationScreen');
  };

  const { location } = props;
  const { latitude, longitude } = location || {};

  return (
    <View syle={styles.container}>
      <MapView
        style={styles.mapView}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {latitude && (
        <Marker coordinate={{ latitude, longitude }}
          onPress={onMarkerPress}
        />
        )}
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
            <NewMissionModal handleChangeLocation={handleChangeLocation} />
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
  mapView: {
    width: '100%',
    height: '100%',
    zIndex: -1,
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

const mapStateToProps = (state) => ({
  location: getLocation(state),
});

export default connect(mapStateToProps, null)(NewActivityScreen);
