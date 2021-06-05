import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Leaderboard from 'react-native-leaderboard';
import { View, StyleSheet, Text } from 'react-native';
import { getTopUsers, getUser, getUserRankInfo } from '../actions/user';

const LeaderboardScreen = (props) => {
  useEffect(() => {
    const getLeaderboardData = async () => {
      const userId = await props.getUser();
      props.getUserRankInfo(userId);
    };

    getLeaderboardData();
    props.getTopUsers();
  }, []);

  const { topUsers, userRankInfo } = props;

  const renderHeader = () => (
    <View>
      <Text>
        #
        {userRankInfo.rank}
      </Text>
      <Text>{userRankInfo.username}</Text>
      <Text>
        {userRankInfo.missionsCompleted}
        {' '}
        missions completed
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <Leaderboard
        data={topUsers}
        sortBy="missionsCompleted"
        labelBy="username"
        icon="profPic"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => ({
  topUsers: state.user.top_users,
  userRankInfo: state.user.user_rank_info,
});

export default connect(mapStateToProps, { getUser, getUserRankInfo, getTopUsers })(LeaderboardScreen);
