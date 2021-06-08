import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View, StyleSheet, Text, Image, TouchableWithoutFeedback,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getTopUsers, getUser, getUserRankInfo } from '../actions/user';
import {
  bgPrimary, bgSecondary, accentPurple,
} from '../constants/colors';

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
        <Text style={styles.mainText}>
          you
        </Text>
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
    <TouchableWithoutFeedback
      onPress={() => props.navigation.navigate('OtherProfileScreen', { thisUsername: user.username })}
      key={user.id}
    >
      <View style={styles.rowContainer}>
        <View style={styles.rowDetails}>
          <Text style={styles.rowRank}>{index}</Text>
          <Image
            style={styles.rowImage}
            source={{ uri: user.profPic }}
          />
          <Text style={styles.rowUsername}>
            {user.username}
          </Text>
        </View>
        <Text style={styles.rowReaches}>
          {user.missionsCompleted}
        </Text>
      </View>
    </TouchableWithoutFeedback>

  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView style={styles.scrollview}>
        {topUsers.map((user, index) => renderRow(user, index + 1))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: bgPrimary,
  },

  // Logged in user's rank info
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    padding: 10,
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
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  profPic: {
    width: 120,
    height: 120,
    borderColor: accentPurple,
    borderWidth: 4,
    borderRadius: 100,
  },

  // Leaderboard rows
  scrollview: {
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    marginVertical: 10,
    paddingHorizontal: 20,
    height: 70,
    backgroundColor: bgSecondary,
    borderRadius: 8,
  },
  rowDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowRank: {
    color: 'white',
    fontSize: 20,
  },
  rowImage: {
    width: 50,
    height: 50,
    marginHorizontal: 20,
    borderRadius: 100,
  },
  rowUsername: {
    color: 'white',
    fontSize: 18,
  },
  rowReaches: {
    color: accentPurple,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state) => ({
  topUsers: state.user.topUsers,
  userRankInfo: state.user.userRankInfo,
});

export default connect(mapStateToProps, { getUser, getUserRankInfo, getTopUsers })(LeaderboardScreen);
