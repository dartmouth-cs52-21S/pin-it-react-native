import React from 'react';
import { connect } from 'react-redux';
import {
  TextInput, Image, View, StyleSheet,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getUploadedImgUrl } from '../../selectors/posts';
import { bgTertiary } from '../../constants/colors';

const PostEditingScreen = (props) => {
  const { uploadedImgUrl } = props;

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <Image
          style={styles.uploadedImage}
          source={{
            uri: uploadedImgUrl,
          }}
        />
        <TextInput style={styles.input} />
        <TextInput style={styles.input} />
      </KeyboardAwareScrollView>
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
  uploadedImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  input: {
    backgroundColor: bgTertiary,
    borderRadius: 10,
    padding: 8,
    color: 'white',
    width: '100%',
  },
});

const mapStateToProps = (state) => ({
  uploadedImgUrl: getUploadedImgUrl(state),
});

export default connect(mapStateToProps, null)(PostEditingScreen);
