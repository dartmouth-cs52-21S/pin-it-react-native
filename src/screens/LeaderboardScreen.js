import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View, StyleSheet, Text, Image,
} from 'react-native';
import { getTopUsers, getUser, getUserRankInfo } from '../actions/user';
import { bgPrimary, accentPink, bgSecondary } from '../constants/colors';

const LeaderboardScreen = (props) => {
  const getLeaderboardData = async () => {
    const userId = await props.getUser();
    props.getUserRankInfo(userId);
  };

  useEffect(() => {
    getLeaderboardData();
    props.getTopUsers();
  }, []);

  const { topUsers, userRankInfo } = props;

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerColumn}>
        <Text style={styles.subText}>
          rank
        </Text>
        <Text style={styles.mainText}>
          {userRankInfo.rank}
        </Text>
      </View>

      <View style={styles.headerColumn}>
        <Image
          style={styles.profPic}
          source={{ uri: userRankInfo.profPic }}
        />
        <Text style={styles.subText}>
          {userRankInfo.username}
        </Text>
      </View>

      <View style={styles.headerColumn}>
        <Text style={styles.subText}>
          reach
        </Text>
        <Text style={styles.mainText}>
          {userRankInfo.missionsCompleted}
        </Text>
      </View>
    </View>
  );

  const renderRow = (user, index) => (
    <View style={styles.rowContainer}>
      <View style={styles.rowRankContainer}>
        <Text style={styles.rowRank}>{index}</Text>
      </View>
      <View key={user.id} style={styles.row}>
        <Image
          style={styles.rowImage}
          source={{ uri: user.profPic }}
        />
        <Text style={styles.rowUsername}>
          {user.username}
        </Text>
        <Text style={styles.rowReaches}>
          {user.missionsCompleted}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      {topUsers.map((user, index) => renderRow(user, index + 1))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: bgPrimary,
  },

  // Logged in user's rank info
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  headerColumn: {
    width: '30%',
    alignItems: 'center',
  },
  subText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  mainText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  profPic: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderColor: accentPink,
    borderWidth: 5,
  },

  // Leaderboard row
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  rowRank: {
    color: 'white',
    fontSize: 20,
  },
  row: {
    backgroundColor: bgSecondary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
    paddingHorizontal: 30,
    height: 60,
    borderRadius: 100,
  },
  rowImage: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  rowUsername: {
    marginLeft: 60,
    color: 'white',
    fontSize: 20,
  },
  rowReaches: {
    color: accentPink,
    fontSize: 25,
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state) => ({
  topUsers: state.user.top_users,
  userRankInfo: state.user.user_rank_info,
});

export default connect(mapStateToProps, { getUser, getUserRankInfo, getTopUsers })(LeaderboardScreen);
