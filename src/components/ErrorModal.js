import React from 'react';
import {
  View, Modal, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import * as Colors from '../constants/colors';

const ErrorModal = (props) => {
  const {
    visible, onDismiss, mainText, secondaryText,
  } = props;
  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.container}>
        <View style={styles.secondaryContainer}>
          <Text style={styles.mainText}>{mainText}</Text>
          <Text style={styles.secondaryText}>{secondaryText}</Text>
          <TouchableOpacity style={styles.cancelButton} onPress={onDismiss}>
            <Text style={styles.buttonText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryContainer: {
    width: 250,
    marginBottom: 200,
    backgroundColor: 'white',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: Colors.bgTertiary,
  },
  mainText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  secondaryText: {
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 30,
    marginBottom: 10,
    width: 100,
    height: 40,
    backgroundColor: Colors.bgTertiary,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    width: 100,
    lineHeight: 40,
    textAlign: 'center',
  },
});
