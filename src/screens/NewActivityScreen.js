import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import {
  StyleSheet, View, TouchableOpacity, Text, ActivityIndicator,
} from 'react-native';
import haversine from 'haversine';
import ConfettiCannon from 'react-native-confetti-cannon';
import { accentPurple, bgPrimary } from '../constants/colors';
import NewMissionModal from '../components/NewMissionModal';
import MissionFoundModal from '../components/MissionFoundModal';
import ArrivedModal from '../components/ArrivedModal';
import DistanceIndicator from '../components/DistanceIndicator';
import { generateMission, routeToMission, postMission } from '../services/missionService';
import { getLocation } from '../selectors/app';
import { getMission } from '../selectors/mission';
import { setMission, clearMission } from '../actions/missions';

const NewActivityScreen = (props) => {
  const ARRIVED_DIST = 50; // when 50 m within destination, register arrival
  const LEFT_DIST = 75; // when 75 m away from destination, no longer able to take pic

  const newMissionRef = useRef(null);
  const missionFoundRef = useRef(null);
  const arrivedRef = useRef(null);
  const confettiRef = useRef(null);
  const mapRef = useRef(null);

  const [missionLocation, setMissionLocation] = useState(null);
  const [raiseModal, setRaiseModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [route, setRoute] = useState([]);

  const { location, mission, navigation } = props;
  const { latitude, longitude } = location || {};

  const [myLocation, setMyLocation] = useState(location);
  const [distance, setDistance] = useState(0);
  const [arrived, setArrived] = useState(false);

  // whenever the user moves (myLocation changes), update value of distance
  useEffect(() => {
    if (mission && myLocation) {
      const loc = { latitude: mission.location.latitude, longitude: mission.location.longitude };
      const METERS_TO_MILES = 1609.34;
      const dist = haversine(myLocation, loc, { unit: 'meter' });
      setDistance((dist / METERS_TO_MILES).toFixed(1));

      if (!arrived && dist < ARRIVED_DIST) {
        setArrived(true);
        arrivedRef.current?.open();
        setTimeout(() => confettiRef.current?.start(), 500);
      }

      if (arrived && dist > LEFT_DIST) {
        setArrived(false);
      }
    }
  }, [myLocation]);

  const drawRoute = async (lat, lng, placeId) => {
    setLoading(true);
    const response = await routeToMission(lat, lng, placeId);
    mapRef.current?.animateToRegion(response.zoomBounds, 1000);
    setRoute(response.coords);
    setLoading(false);
  };

  // if you selected an existing mission. load the route from existing mission
  useEffect(() => {
    if (mission && (!missionLocation || missionLocation.placeId !== mission.location.placeId)) {
      setMissionLocation(mission.location);
      drawRoute(43.7022, -72.2896, mission.location.placeId);
    }
  }, [mission]);

  const onModalPress = (e) => {
    newMissionRef.current?.open();
  };

  const onSubmit = async (lat, lng, radius, query) => {
    setRaiseModal(false);
    newMissionRef.current?.close();
    const data = await generateMission(lat, lng, radius, query);
    setMissionLocation(data);
    missionFoundRef.current?.open();
  };

  const onAccept = async () => {
    missionFoundRef.current?.close();
    const createdMission = await postMission('hey', 'hello', missionLocation);
    props.setMission(createdMission);
    drawRoute(latitude, longitude, createdMission.location.placeId);
  };

  const onCancel = () => {
    props.clearMission();
    setMissionLocation(null);
    setRoute([]);
  };

  const onTakePhotoPress = () => {
    arrivedRef.current?.close();
    navigation.navigate('CameraScreen');
  };

  return (
    <View syle={styles.container}>
      <MapView
        ref={mapRef}
        style={[styles.mapView, mission ? { height: '90%' } : null]}
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
        <Marker coordinate={{ latitude, longitude }} />
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
          <Modalize ref={arrivedRef}
            modalStyle={{ backgroundColor: bgPrimary }}
            modalHeight={700}
          >
            <View style={{ height: 700 }}>
              <ArrivedModal mission={mission} onPress={onTakePhotoPress} />
              <ConfettiCannon count={200}
                origin={{ x: -10, y: 0 }}
                autoStart={false}
                ref={confettiRef}
                onAnimationEnd={() => confettiRef.current?.stop()}
                fadeOut
                fallSpeed={2000}
              />
            </View>
          </Modalize>
        </Portal>
      </View>
      {mission && (
        <DistanceIndicator mission={mission} distance={distance} onCancel={onCancel} />
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
