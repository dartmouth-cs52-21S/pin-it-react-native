import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator, TextInput, Image, View, StyleSheet,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MapView, { Marker } from 'react-native-maps';
import { getLocation } from '../../selectors/app';
import { getCurrentPost } from '../../selectors/posts';
import { updateCurrentPost } from '../../actions/posts';
import { bgPrimary, bgTertiary } from '../../constants/colors';
import TagRow from '../../components/TagRow';
import LocationDisplay from '../../components/LocationDisplay';

const PostCreationScreen = (props) => {
  const { post, updatePost, currentLocation } = props;
  const [postCaption, setPostCaption] = useState('');
  const [location, setLocation] = useState(currentLocation);

  const { latitude, longitude } = location || { };

  const imageUrl = post?.imageUrls?.[0];

  if (!post) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        {imageUrl
          ? (
            <Image
              style={styles.uploadedImage}
              source={{
                uri: imageUrl,
              }}
            />
          )
          : (
            <View style={styles.uploadedImage}>
              <ActivityIndicator />
            </View>
          )}
        <View style={styles.postDetailsContainer}>
          <TagRow
            active={[post.category]}
            containerStyle={styles.tagRow}
            handleTagPressed={(category) => updatePost({ ...post, category })}
          />
          <TextInput
            style={styles.textInput}
            value={postCaption}
            onChangeText={(caption) => { updatePost({ ...post, caption }); setPostCaption(caption); }}
            placeholder="Caption"
            placeholderTextColor="grey"
            multiline
            numberOfLines={3}
          />
          <LocationDisplay
            onPress={(place) => setLocation(place)}
            onClear={() => setLocation(currentLocation)}
          />
          {location && (
          <>
            <MapView
              style={styles.mapView}
              initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              pitchEnabled={false}
              rotateEnabled={false}
              zoomEnabled={false}
              scrollEnabled={false}
            >
              <Marker coordinate={{ latitude, longitude }} />
            </MapView>
          </>
          )}

        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: bgPrimary,
  },
  postDetailsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 45,
  },
  uploadedImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: bgTertiary,
    borderRadius: 10,
    paddingTop: 12,
    paddingBottom: 12,
    padding: 10,
    color: 'white',
    width: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    marginBottom: 15,
  },
  locationDisplay: {
    marginBottom: 15,
  },
  tagRow: {
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  mapView: {
    width: '100%',
    height: 200,
    zIndex: -1,
    marginBottom: 20,
  },
});

const mapStateToProps = (state) => ({
  post: getCurrentPost(state),
  location: getLocation(state),
  currentLocation: state.locations.currentLocation,
});

const mapDispatchToProps = {
  updatePost: updateCurrentPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCreationScreen);
