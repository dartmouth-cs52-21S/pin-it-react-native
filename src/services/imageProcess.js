import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import { Circle, Rect } from 'react-native-svg';
import TypeWriter from 'react-native-typewriter';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImageBrowser } from 'expo-image-picker-multiple';
import { handleImageProcess } from '../actions/posts';
import { bgPrimary, bgSecondary } from '../constants/colors';
import fontStyles from '../constants/fonts';

// Adapted from https://snack.expo.io/@monstrodev/expo-image-picker-multiple-full-example
const ImageBrowserScreen = (props) => {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(false);

  const imagesCallback = (callback) => {
    setIsLoading(true);
    navigation.setOptions({ headerShown: false });

    callback.then(async (photos) => {
      const cPhotos = [];
      for (const photo of photos) {
        // eslint-disable-next-line no-await-in-loop
        const pPhoto = await _processImageAsync(photo.uri);
        cPhotos.push(pPhoto);
      }
      // eslint-disable-next-line react/destructuring-assignment
      setTimeout(() => {
        props.handleImageProcess(cPhotos, navigation);
        navigation.setOptions({ headerShown: true });
        setIsLoading(false);
      }, 5000);
    })
      .catch((e) => console.log(e));
  };

  const _renderDoneButton = (count, onSubmit) => {
    if (!count) return null;
    return (
      <TouchableOpacity
        title="Done"
        onPress={onSubmit}
        style={styles.doneButton}
      >
        <Text
          onPress={onSubmit}
          style={{ fontSize: 16 }}
        >
          Done
        </Text>
      </TouchableOpacity>
    );
  };

  const updateHandler = (count, onSubmit) => {
    // eslint-disable-next-line react/destructuring-assignment
    props.navigation.setOptions({
      title: `Selected ${count} files`,
      headerRight: () => _renderDoneButton(count, onSubmit),
    });
  };

  const _processImageAsync = async (uri) => {
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1000 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG, base64: true },
    );
    return file;
  };

  const renderSelectedComponent = (number) => (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{number}</Text>
    </View>
  );

  const emptyStayComponent = <Text style={styles.emptyStay}>Empty =(</Text>;

  return (
    <View style={[styles.flex, styles.container]}>
      <ImageBrowser
        max={4}
        onChange={updateHandler}
        callback={imagesCallback}
        renderSelectedComponent={renderSelectedComponent}
        emptyStayComponent={emptyStayComponent}
      />

      {/* Loading indicator */}
      {isLoading
      && (
      <View style={styles.loadingIndicatorContainer}>
        <Text style={[fontStyles.mediumTextBold]}>Get excited! ✨</Text>
        <TypeWriter
          style={[fontStyles.mediumTextRegular, { padding: 10 }]}
          typing={1}
          minDelay={100}
          fixed
        >
          Creating your post...
        </TypeWriter>
        <SvgAnimatedLinearGradient
          primaryColor={bgPrimary}
          secondaryColor={bgSecondary}
          width={250}
          height={350}
        >
          <Circle cx="30" cy="30" r="30" />
          <Rect x="75" y="13" rx="4" ry="4" width="100" height="13" />
          <Rect x="75" y="37" rx="4" ry="4" width="50" height="8" />
          <Rect x="0" y="70" rx="5" ry="5" width="250" height="250" />
        </SvgAnimatedLinearGradient>
      </View>
      )}
    </View>
  );
};

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
  doneButton: {
    padding: 10,
  },
  loadingIndicatorContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(147,129,255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(null, { handleImageProcess })(ImageBrowserScreen);
