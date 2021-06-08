import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImageBrowser } from 'expo-image-picker-multiple';
import { handleImageProcess } from '../actions/posts';

class ImageBrowserScreen extends Component {
  _getHeaderLoader = () => (
    <ActivityIndicator size="small" color="#0580FF" />
  );

  imagesCallback = (callback) => {
    const { navigation } = this.props;
    navigation.setOptions({
      headerRight: () => this._getHeaderLoader(),
    });

    callback.then(async (photos) => {
      const cPhotos = [];
      for (const photo of photos) {
        // eslint-disable-next-line no-await-in-loop
        const pPhoto = await this._processImageAsync(photo.uri);
        cPhotos.push(pPhoto);
      }
      // eslint-disable-next-line react/destructuring-assignment
      this.props.handleImageProcess(cPhotos, navigation);
    })
      .catch((e) => console.log(e));
  };

  _renderDoneButton = (count, onSubmit) => {
    if (!count) return null;
    return (
      <TouchableOpacity title="Done" onPress={onSubmit}>
        <Text onPress={onSubmit}>Done</Text>
      </TouchableOpacity>
    );
  }

  updateHandler = (count, onSubmit) => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.navigation.setOptions({
      title: `Selected ${count} files`,
      headerRight: () => this._renderDoneButton(count, onSubmit),
    });
  };

  async _processImageAsync(uri) {
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1000 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG, base64: true },
    );
    return file;
  }

  renderSelectedComponent = (number) => (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{number}</Text>
    </View>
  );

  render() {
    const emptyStayComponent = <Text style={styles.emptyStay}>Empty =(</Text>;

    return (
      <View style={[styles.flex, styles.container]}>
        <ImageBrowser
          max={4}
          onChange={this.updateHandler}
          callback={this.imagesCallback}
          renderSelectedComponent={this.renderSelectedComponent}
          emptyStayComponent={emptyStayComponent}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    position: 'relative',
  },
  emptyStay: {
    textAlign: 'center',
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: 'absolute',
    right: 3,
    bottom: 3,
    justifyContent: 'center',
    backgroundColor: '#0580FF',
  },
  countBadgeText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 'auto',
    color: '#ffffff',
  },
});

export default connect(null, { handleImageProcess })(ImageBrowserScreen);
