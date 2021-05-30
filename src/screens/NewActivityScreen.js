/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import {
  StyleSheet, View, TouchableOpacity, Text, ActivityIndicator,
} from 'react-native';
import haversine from 'haversine';
import { accentPurple, bgPrimary } from '../constants/colors';
import NewMissionModal from '../components/NewMissionModal';
import MissionFoundModal from '../components/MissionFoundModal';
import DistanceIndicator from '../components/DistanceIndicator';
import { generateMission, routeToMission, postMission } from '../services/missionService';
import { getLocation } from '../selectors/app';
import { getMission } from '../selectors/mission';
import { setMission, clearMission } from '../actions/missions';

const NewActivityScreen = (props) => {
  const newMissionRef = useRef(null);
  const missionFoundRef = useRef(null);

  const [missionLocation, setMissionLocation] = useState(null);
  const [raiseModal, setRaiseModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [route, setRoute] = useState([]);

  const { location, mission } = props;
  const { latitude, longitude } = location || {};

  const [myLocation, setMyLocation] = useState(location);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (mission && myLocation) {
      const loc = { latitude: mission.location.latitude, longitude: mission.location.longitude };
      const dist = haversine(myLocation, loc, { unit: 'mile' });
      console.log(dist);
      setDistance(Math.floor(dist));
    }
  }, [myLocation]);

  const onMarkerPress = (e) => {
    console.log('pressed');
  };

  const onModalPress = (e) => {
    newMissionRef.current?.open();
  };

  const onSubmit = async (lat, lng, radius, query) => {
    setRaiseModal(false);
    newMissionRef.current?.close();
    console.log(myLocation);
    const data = await generateMission(lat, lng, radius, query);
    setMissionLocation(data);
    missionFoundRef.current?.open();
  };

  const onAccept = async () => {
    missionFoundRef.current?.close();
    setLoading(true);
    const createdMission = await postMission('hey', 'hello', missionLocation);
    props.setMission(createdMission);
    const newRoute = await routeToMission(latitude, longitude, createdMission.location.placeId);
    setLoading(false);
    setRoute(newRoute.route);
  };

  const onCancel = () => {
    props.clearMission();
    setMissionLocation(null);
    setRoute([]);
  };

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
        showsUserLocation
        onUserLocationChange={(e) => {
          const userLocation = {
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          };
          setMyLocation(userLocation);
        }}
      >
        {latitude && (
        <Marker coordinate={{ latitude, longitude }}
          onPress={onMarkerPress}
        />
        )}

        {missionLocation && (
          <Marker coordinate={missionLocation}
            title="destination"
          />
        )}

        <Polyline coordinates={route} strokeWidth={4} strokeColor="blue" />
      </MapView>
      <View style={styles.buttonContainer}>
        {!mission && (
        <TouchableOpacity style={styles.newActivityButton} onPress={onModalPress}>
          <Text style={styles.buttonText}>🎲 Generate New Mission</Text>
        </TouchableOpacity>
        )}
        <Portal>
          <Modalize ref={newMissionRef}
            modalHeight={raiseModal ? 800 : 500}
            modalStyle={{ backgroundColor: bgPrimary }}
            scrollViewProps={{ keyboardShouldPersistTaps: 'always' }}
          >
            <NewMissionModal onSubmit={onSubmit}
              initialLocation={location}
              onFocus={() => setRaiseModal(true)}
              onBlur={() => setRaiseModal(false)}
            />
          </Modalize>
          <Modalize ref={missionFoundRef}
            modalStyle={{ backgroundColor: bgPrimary }}
            modalHeight={700}
          >
            <MissionFoundModal location={missionLocation} onAccept={onAccept} />
          </Modalize>
        </Portal>
      </View>
      {mission && (
        <DistanceIndicator mission={mission} distance={distance} position={{ bottom: 60, left: 0 }} onCancel={onCancel} />
      )}
      {loading && (
        <ActivityIndicator style={styles.activityIndicator}
          size="large"
          color={accentPurple}
        />
      )}
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
  activityIndicator: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
  },
});

const mapStateToProps = (state) => ({
  location: getLocation(state),
  mission: getMission(state),
});

export default connect(mapStateToProps, { setMission, clearMission })(NewActivityScreen);
