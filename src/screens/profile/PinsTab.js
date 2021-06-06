import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet, Image, View, Text,
} from 'react-native';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import { getUserData } from '../../selectors/user';
import * as Colors from '../../constants/colors';
import fontStyles from '../../constants/fonts';
import { formatImgUrl } from '../../services/imageUpload';

const N_BOXES = 20;
const EPS = 5;

const PinsTab = ({ user, ...props }) => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 20,
    longitude: -75,
    latitudeDelta: 100,
    longitudeDelta: 100,
  });

  const withinRadius = (obj1, obj2, r) => {
    const latdist = (obj1.latitude - obj2.latitude) ** 2;
    const longdist = (obj1.longitude - obj2.longitude) ** 2;

    return Math.sqrt(latdist + longdist) < r;
  };

  const groupLocations = (posts) => {
    if (!posts) return [];
    const groupedLocations = [];

    for (const post of posts) {
      const { location } = post;
      // eslint-disable-next-line no-continue
      if (!location) { continue; }

      let grouped = false;
      for (const group of groupedLocations) {
        if (withinRadius(group, location, region.longitudeDelta / N_BOXES)) {
          grouped = true;
          group.numberOfPosts += 1;
          group.posts.push(post);
          break;
        }
      }
      if (!grouped) {
        groupedLocations.push({
          ...location, imageUrl: post.imageUrls[0], numberOfPosts: 1, posts: [post],
        });
      }
    }
    return groupedLocations;
  };

  const renderLocationMarker = (location, index) => {
    const { latitude, longitude } = location;
    return (
      <Marker
        key={location.id}
        coordinate={{ latitude, longitude }}
        onPress={() => props.navigation.navigate('PinsLocationFeedScreen', { posts: location.posts })}
      >
        <View>
          <Image style={styles.imageIcon} source={{ uri: formatImgUrl(location.imageUrl, 200, 200) }} />
          <View style={styles.numberIndicator}>
            <Text style={fontStyles.smallTextBold}>{location.numberOfPosts}</Text>
          </View>
        </View>
      </Marker>
    );
  };

  const [locations, setLocations] = useState(groupLocations(user.posts));

  useEffect(() => {
    setLocations(groupLocations(user.posts));
  }, [Math.ceil(region.longitudeDelta / EPS), JSON.stringify(user.posts)]); // Optimize to listen to significant changes in long Delta only

  return (
    <MapView
      ref={mapRef}
      style={styles.mapView}
      initialRegion={region}
      onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
    >
      {locations?.map((location, index) => renderLocationMarker(location, index))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapView: {
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  imageIcon: {
    width: 70,
    height: 70,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'white',
  },
  numberIndicator: {
    display: 'flex',
    position: 'absolute',
    right: -10,
    top: -10,
    justifyContent: 'center',
    backgroundColor: Colors.accentPurple,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
});

const mapStateToProps = (state) => ({
  user: getUserData(state),
});

export default connect(mapStateToProps, null)(PinsTab);
