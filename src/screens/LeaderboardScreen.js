import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import { getTopUsers } from '../actions/user';

const LeaderboardScreen = (props) => {
  useEffect(() => { props.getTopUsers(); }, []);

  const { topUsers } = props;
  console.log(topUsers);

  return (
    <View style={styles.container}>
      <Text>Todo</Text>
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
});

export default connect(mapStateToProps, { getTopUsers })(LeaderboardScreen);
