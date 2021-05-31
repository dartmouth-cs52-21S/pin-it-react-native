import React, { useEffect } from 'react';
import {
  Text, SafeAreaView, View, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bgPrimary } from '../constants/colors';
import fontStyles from '../constants/fonts';
import { getMissionsList } from '../selectors/mission';
import { getMissions, setMission } from '../actions/missions';
import MissionDisplay from '../components/MissionDisplay';

const OngoingActivityScreen = (props) => {
  const { navigation, missions } = props;

  useEffect(() => {
    // will trigger whenever screen is focused on (from https://reactnavigation.org/docs/navigation-lifecycle/)
    const unsubscribe = navigation.addListener('focus', () => {
      props.getMissions();
    });
    return unsubscribe;
  }, [navigation]);

  const onMissionPress = (mission) => {
    const newLoc = {
      title: 'hey', placeId: 'ChIJo35jfy_-c48Rz_lmGfs40lA', latitude: 12.10226, longitude: -86.247444,
    };
    props.setMission({ ...mission, location: newLoc });
    navigation.navigate('New');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={fontStyles.largeHeaderTitle}>My Missions</Text>
      </View>
      {missions.filter((mission) => !mission.completed).map((mission) => (
        <MissionDisplay
          mission={mission}
          key={mission.title}
          onPress={() => onMissionPress(mission)}
        />
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: bgPrimary,
  },
  headerText: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
  },
  headerContainer: {
    marginTop: 80,
    padding: 20,
  },
  missionText: {
    color: 'white',
  },
});

const mapStateToProps = (state) => ({
  missions: getMissionsList(state),
});

export default connect(mapStateToProps, { getMissions, setMission })(OngoingActivityScreen);
