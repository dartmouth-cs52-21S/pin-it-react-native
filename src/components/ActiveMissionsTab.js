import React from 'react';
import { View } from 'react-native';
import MissionCard from './MissionCard';

const ActiveMissionsTab = () => (
  <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
    <MissionCard
      category="Restaurant"
      title="Fancy Cupcakery"
      walkingTime={10}
      drivingTime={2}
    />
    <MissionCard
      category="Art"
      title="Museum of Contemporary Art owehf w howhfow hwofhwohef whfoweh ohw oewfho"
      walkingTime={10}
      drivingTime={2}
    />
  </View>
);

export default ActiveMissionsTab;
