import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, StyleSheet, ScrollView,
} from 'react-native';
import { bgPrimary } from '../../constants/colors';
import MissionCard from '../../components/MissionCard';

const MissionsRender = (completed) => {
  const thisCompleted = completed;
  return (
    <ScrollView>
      {thisCompleted.map((mission) => (
        <MissionCard
          mission={mission}
          key={`${mission.title}${mission.createdAt}`}
          onPress={() => {}}
        />
      ))}
    </ScrollView>
  );
};

const OtherMissionsTab = (props) => {
  const { navigation, missions } = props;
  const [completed, setCompleted] = useState(null);

  useEffect(() => {
    if (missions) {
      setCompleted(missions.filter((mission) => mission.completed));
    }
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {
      (completed)
        ? MissionsRender(completed)
        : <></>
      }
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

export default OtherMissionsTab;
