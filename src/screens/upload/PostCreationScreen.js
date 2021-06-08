import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator, TextInput, View, StyleSheet,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MapView, { Marker } from 'react-native-maps';
import { getCurrentPost } from '../../selectors/posts';
import { updateCurrentPost } from '../../actions/posts';
import { bgPrimary, bgTertiary } from '../../constants/colors';
import LocationDisplay from '../../components/LocationDisplay';
import { getLocationByPlaceId, getCurrentLocation } from '../../services/locationService';
import UploadImageCarousel from '../../components/UploadImageCarousel';

const PostCreationScreen = (props) => {
  const { post, updatePost, currentLocation } = props;
  const [postCaption, setPostCaption] = useState('');
  const [location, setLocation] = useState(currentLocation);
  const map = useRef(null);

  useEffect(() => {
    getCurrentLocation((loc) => {
      updatePost({ ...post, location: loc });
    });
  }, []);

  const { latitude, longitude } = location || { };

  // const imageUrl = post?.imageUrls?.[0];
  // const renderImages = post.imageUrls?.map((uri) => (
  //   <Image
  //     style={styles.uploadedImage}
  //     source={{
  //       uri,
  //     }}
  //   />
  // ));
  const renderImages = <UploadImageCarousel imageUrls={post.imageUrls} />;

  if (!post) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  const setLocationToPost = async (place) => {
    const loc = await getLocationByPlaceId(place.place_id);
    setLocation(loc);
    updatePost({ ...post, location: loc });
    map.current?.animateToRegion({
      latitude: loc.latitude,
      longitude: loc.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        {post.imageUrls
          ? (
            renderImages
          )
          : (
            <View style={styles.uploadedImage}>
              <ActivityIndicator />
            </View>
          )}
        <View style={styles.postDetailsContainer}>
          <TextInput
            style={styles.textInput}
            value={postCaption}
            onChangeText={(caption) => {
              updatePost({ ...post, caption });
              setPostCaption(caption);
            }}
            placeholder="Caption"
            placeholderTextColor="grey"
            multiline
            numberOfLines={3}
          />
          <LocationDisplay
            onPress={setLocationToPost}
            onClear={() => setLocation(currentLocation)}
          />
          {location && (
          <>
            <MapView
              ref={map}
              style={styles.mapView}
              initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
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
  mapView: {
    width: '100%',
    height: 200,
    zIndex: -1,
    marginBottom: 20,
  },
});

const mapStateToProps = (state) => ({
  post: getCurrentPost(state),
  currentLocation: state.locations.currentLocation,
});

const mapDispatchToProps = {
  updatePost: updateCurrentPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCreationScreen);
