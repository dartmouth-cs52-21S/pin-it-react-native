import React from 'react';
import PostCarouselList from '../../components/PostCarouselList';

const PinsLocationFeedScreen = ({ route }) => {
  const { posts } = route.params;
  return <PostCarouselList posts={posts} />;
};

export default PinsLocationFeedScreen;
