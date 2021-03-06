import React, { useEffect, useState } from 'react';
import {
  Text, SafeAreaView, View, StyleSheet, TouchableWithoutFeedback, ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { bgPrimary } from '../constants/colors';
import fontStyles from '../constants/fonts';
import { getMissionsList } from '../selectors/mission';
import { getMissions, setMission, deleteMission } from '../actions/missions';
import MissionCard from '../components/MissionCard';

const OngoingActivityScreen = (props) => {
  const { navigation, missions, isProfileScreen } = props;
  const [activeTab, setActiveTab] = useState(true);

  useEffect(() => {
    // will trigger whenever screen is focused on (from https://reactnavigation.org/docs/navigation-lifecycle/)
    const unsubscribe = navigation.addListener('focus', () => {
      props.getMissions();
    });
    return unsubscribe;
  }, []);

  const onMissionPress = (mission) => {
    props.setMission(mission);
    navigation.navigate('New');
  };

  const active = missions.filter((mission) => !mission.completed);
  const completed = missions.filter((mission) => mission.completed);

  return (
    <SafeAreaView style={styles.container}>
      {!isProfileScreen && (
      <View style={styles.headerContainer}>
        <Text style={fontStyles.smallHeaderTitle}>My Reaches</Text>
      </View>
      )}
      <View style={styles.selectorContainer}>
        <TouchableWithoutFeedback onPress={() => setActiveTab(true)}>
          <View style={styles.selectorTextContainer}>
            <Text style={[styles.selectorText, activeTab ? { fontWeight: 'bold' } : null]}
              onPress={() => setActiveTab(true)}
            >
              {`Active (${active.length})`}
            </Text>
            {activeTab && <View style={styles.circleSelector} />}
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setActiveTab(false)}>
          <View style={styles.selectorTextContainer}>
            <Text style={[styles.selectorText, activeTab ? null : { fontWeight: 'bold' }]}
              onPress={() => setActiveTab(false)}
            >
              {`Completed (${completed.length})`}
            </Text>
            {!activeTab && <View style={styles.circleSelector} />}
          </View>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView>
        {activeTab
          ? active.map((mission, index) => (
            <MissionCard
              mission={mission}
              key={`${mission.title}${mission.createdAt}`}
              onPress={() => onMissionPress(mission)}
              onRemove={() => props.deleteMission(mission.id)}
            />
          ))
          : completed.map((mission) => (
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
  headerContainer: {
    marginTop: 70,
    paddingVertical: 20,
    marginHorizontal: '5%',
  },
  missionText: {
    color: 'white',
  },
  selectorContainer: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
  },
  selectorTextContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: '5%',
  },
  selectorText: {
    fontSize: 16,
    width: '100%',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '300',
  },
  circleSelector: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
});

const mapStateToProps = (state) => ({
  missions: getMissionsList(state),
});

export default connect(mapStateToProps, { getMissions, setMission, deleteMission })(OngoingActivityScreen);
