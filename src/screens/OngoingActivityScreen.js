import React, { useState } from 'react';
import {
  Text, SafeAreaView, View, StyleSheet,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { bgPrimary } from '../constants/colors';
import fontStyles from '../constants/fonts';
import * as Colors from '../constants/colors';
import ActiveMissionsTab from '../components/ActiveMissionsTab';

const CompletedTab = () => (<Text style={styles.testText}>Completed</Text>);

const OngoingActivityScreen = () => {
  const renderScene = SceneMap({
    active: ActiveMissionsTab,
    completed: CompletedTab,
  });

  const renderLabel = (labelProps) => (
    <Text style={[fontStyles.mediumTextRegular,
      labelProps.focused ? { color: Colors.accentPurple, fontWeight: 'bold' } : { color: 'white' },
    ]}
    >
      {labelProps.route.title}
    </Text>
  );

  const renderTabBar = (props) => (
    <TabBar
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      scrollEnabled
      indicatorStyle={{ backgroundColor: Colors.accentPurple }}
      style={{
        backgroundColor: Colors.bgPrimary, marginLeft: '5%', marginRight: '5%',
      }}
      tabStyle={styles.tabStyle}
      renderLabel={renderLabel}
    />
  );

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'active', title: 'Active' },
    { key: 'completed', title: 'Completed' },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={fontStyles.largeHeaderTitle}>My Missions</Text>
      </View>
      <TabView
        style={styles.tabViewContainer}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
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
    marginTop: 100,
    padding: 20,
  },
  tabStyle: {
    padding: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderColor: Colors.bgPrimary,
    width: 'auto',
  },
});

export default OngoingActivityScreen;
