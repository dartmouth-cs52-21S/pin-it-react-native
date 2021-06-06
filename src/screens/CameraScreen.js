import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { Camera } from 'expo-camera';
import { connect } from 'react-redux';
import * as Colors from '../constants/colors';
import { handleUploadfromCamera } from '../actions/posts';
import { clearMission } from '../actions/missions';
import { completeMission } from '../services/missionService';
import { getMission } from '../selectors/mission';

// adapted from sample code at https://docs.expo.io/versions/latest/sdk/camera/
const CameraScreen = (props) => {
  const [camPermission, setCamPermission] = useState(false);
  const [loading, setLoading] = useState(false);
  const cam = useRef(null);

  const onSuccess = () => {
    setLoading(false);
    props.clearMission();
    completeMission(props.mission.id);
    props.navigation.navigate('PostCreationScreen');
  };

  const getPermissions = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setCamPermission(status === 'granted');
  };

  useEffect(() => {
    getPermissions();
  });

  const takePhoto = async () => {
    if (!cam) return;
    if (loading) return;

    setLoading(true);
    try {
      const newPhoto = await cam.current?.takePictureAsync({ base64: true });
      props.handleUploadfromCamera(newPhoto.base64, onSuccess);
    } catch (error) {
      setLoading(false);
    }
  };

  if (!camPermission) return <Text>No Permission Granted</Text>;

  return (
    <View>
      <Camera ref={cam} style={styles.container} type={Camera.Constants.Type.back}>
        <View style={styles.takePhotoContainer}>
          <TouchableOpacity style={styles.takePhotoButton} onPress={takePhoto}>
            <View style={styles.innerButton} />
          </TouchableOpacity>
        </View>
      </Camera>
      {loading && (
        <ActivityIndicator style={styles.activityIndicator}
          size="large"
          color={Colors.accentPurple}
        />
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  mission: getMission(state),
});

export default connect(mapStateToProps, { handleUploadfromCamera, clearMission })(CameraScreen);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.bgPrimary,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  takePhotoContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  takePhotoButton: {
    height: 80,
    width: 80,
    borderRadius: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerButton: {
    height: 70,
    width: 70,
    backgroundColor: 'white',
    borderRadius: 100,
    borderWidth: 3,
    borderColor: Colors.bgPrimary,
  },
  activityIndicator: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
  },
});
