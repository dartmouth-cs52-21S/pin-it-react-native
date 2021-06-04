import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Text, TouchableOpacity, View, StyleSheet,
} from 'react-native';
import { handleImageUpload } from '../../actions/posts';
import BadgeModal from '../../components/BadgeModal';

const UploadScreen = (props) => {
  const { handleImageUpload: handleUploadPress } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const onSuccess = () => props.navigation.navigate('PostCreationScreen');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.uploadButton} onPress={() => handleUploadPress(onSuccess)}>
        <Text>Upload Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.uploadButton} onPress={() => setModalVisible(!modalVisible)}>
        <Text>Open Modal</Text>
      </TouchableOpacity>
      <BadgeModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
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
  uploadButton: {
    width: 150,
    height: 50,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    height: '50%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '100%',
    height: '100%',
  },
});

export default connect(null, { handleImageUpload })(UploadScreen);
