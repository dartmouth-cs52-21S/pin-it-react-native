import React from 'react';
import PostCarouselList from '../../components/PostCarouselList';

const PostsTab = (props) => {
  const { posts } = props;
  return <PostCarouselList posts={posts} />;
};

export default PostsTab;
