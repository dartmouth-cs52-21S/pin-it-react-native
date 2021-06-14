import React, { useRef } from 'react';
import {
  Text, View, StyleSheet, Modal, Pressable,
} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import * as Colors from '../constants/colors';
import fontStyles from '../constants/fonts';
import BadgeTile from './BadgeTile';
import { setBadges } from '../actions/badges';

const BadgeModal = (props) => {
  const { modalVisible, setModalVisible, badges } = props;
  const confettiRef = useRef(null);

  const handleCloseModal = () => {
    setModalVisible(!modalVisible);
    props.setBadges([]);
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
    >
      <ConfettiCannon count={200}
        origin={{ x: -10, y: 0 }}
        autoStart
        ref={confettiRef}
        onAnimationEnd={() => confettiRef.current?.stop()}
        fadeOut
        fallSpeed={2000}
      />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <View />
            <Pressable
              style={[styles.button]}
              onPress={handleCloseModal}
            >
              <View style={styles.imagesIcon}>
                <FontAwesomeIcon icon={faTimes} size={29} color="white" />
              </View>
            </Pressable>
          </View>
          <Text style={[fontStyles.largeTextBold, styles.modalText]}>CONGRATULATIONS!</Text>
          <Text style={[fontStyles.smallTextRegular, styles.modalText]}>You have earned the following badge(s):</Text>
          {badges.map((badge) => <BadgeTile key={badge.id} badge={badge} />)}
          <Text style={[fontStyles.smallTextRegular, styles.modalText]}>Head over to profile to see all your badges!</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    width: 150,
    height: 50,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '100%',
    height: '100%',
  },
  modalView: {
    borderRadius: 20,
    backgroundColor: Colors.bgTertiary,
    alignItems: 'center',
    shadowColor: '#000',
    width: '90%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: '10%',
    paddingVertical: '8%',
  },
  modalText: {
    marginVertical: 10,
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => ({
  badges: state.badges.badgeList,
});

export default connect(mapStateToProps, { setBadges })(BadgeModal);
