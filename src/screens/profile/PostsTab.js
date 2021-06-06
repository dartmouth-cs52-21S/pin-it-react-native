import React from 'react';
import { connect } from 'react-redux';
import { getUserData } from '../../selectors/user';
import PostCarouselList from '../../components/PostCarouselList';

const PostsTab = ({ user }) => {
  const { posts } = user;
  return <PostCarouselList posts={posts} />;
};

const mapStateToProps = (state) => ({
  user: getUserData(state),
});

export default connect(mapStateToProps, null)(PostsTab);
