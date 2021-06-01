import React from 'react';
import {
  SafeAreaView, FlatList, StyleSheet, StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import BadgeTile from '../../components/BadgeTile';
import { bgPrimary } from '../../constants/colors';

const renderItem = ({ item }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <BadgeTile {...item} />
);

const BadgesTab = (props) => {
  const { user } = props;
  const { badges } = user;
  console.log(user);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={badges}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
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
