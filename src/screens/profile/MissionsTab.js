import React, { useEffect } from 'react';
import {
  SafeAreaView, StyleSheet, ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { bgPrimary } from '../../constants/colors';
import { getMissionsList } from '../../selectors/mission';
import { getMissions, setMission, deleteMission } from '../../actions/missions';
import MissionCard from '../../components/MissionCard';

const MissionsTab = (props) => {
  const { navigation, missions } = props;

  useEffect(() => {
    // will trigger whenever screen is focused on (from https://reactnavigation.org/docs/navigation-lifecycle/)
    const unsubscribe = navigation.addListener('focus', () => {
      props.getMissions();
    });
    return unsubscribe;
  }, [navigation]);

  const completed = missions.filter((mission) => mission.completed);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {completed.map((mission) => (
          <MissionCard
            mission={mission}
            key={`${mission.title}${mission.createdAt}`}
            onPress={() => {}}
            onRemove={() => props.deleteMission(mission.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: bgPrimary,
    paddingVertical: 15,
  },
});

const mapStateToProps = (state) => ({
  missions: getMissionsList(state),
});

export default connect(mapStateToProps, { getMissions, setMission, deleteMission })(MissionsTab);
