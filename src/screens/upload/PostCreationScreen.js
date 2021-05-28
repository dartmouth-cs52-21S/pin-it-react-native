import React from 'react';
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
  const { post, location, updatePost } = props;

  const { latitude, longitude } = location || { };
  const imageUrl = post.imageUrls[0];

  if (!imageUrl) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <Image
          style={styles.uploadedImage}
          source={{
            uri: imageUrl,
          }}
        />
        <View style={styles.postDetailsContainer}>
          <TagRow
            active={[post.tag]}
            containerStyle={styles.tagRow}
            handleTagPressed={(tag) => updatePost({ ...post, tag })}
          />
          <TextInput
            style={styles.textInput}
            value={post.caption}
            onChangeText={(caption) => updatePost({ ...post, caption })}
            placeholder="Caption"
            placeholderTextColor="grey"
            multiline
            numberOfLines={3}
          />
          <LocationDisplay containerStyle={styles.locationDisplay} handlePress={() => props.navigation.navigate('ChangeLocationScreen')} />
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: bgPrimary,
  },
  postDetailsContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginTop: 45,
  },
  uploadedImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  textInput: {
    backgroundColor: bgTertiary,
    borderRadius: 10,
    paddingTop: 12,
    paddingBottom: 12,
    padding: 10,
    color: 'white',
    width: '90%',
    maxWidth: '90%',
    marginBottom: 15,
  },
  locationDisplay: {
    marginBottom: 15,
  },
  tagRow: {
    marginBottom: 20,
  },
  mapView: {
    width: '90%',
    height: 200,
    zIndex: -1,
    marginBottom: 20,
  },
});

const mapStateToProps = (state) => ({
  post: getCurrentPost(state),
  location: getLocation(state),
});

const mapDispatchToProps = {
  updatePost: updateCurrentPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCreationScreen);
