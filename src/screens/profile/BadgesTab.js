import React from 'react';
import {
  SafeAreaView, FlatList, StyleSheet, StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import BadgeTile from '../../components/BadgeTile';
import { bgPrimary } from '../../constants/colors';

const renderItem = ({ item }) => {
  const { dateEarned } = item;
  return <BadgeTile badge={{ ...item.badge, dateEarned }} />;
};

const BadgesTab = (props) => {
  const { user } = props;
  const { badges } = user;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={badges}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.badge.title}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: bgPrimary,
  },
});

const mapStateToProps = (state) => ({
  user: state.user.user_data,
});

export default connect(mapStateToProps, null)(BadgesTab);
