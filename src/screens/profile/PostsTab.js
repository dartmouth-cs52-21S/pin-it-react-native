import React from 'react';
import { connect } from 'react-redux';
import { getUserData } from '../../selectors/user';
import PostCarouselList from '../../components/PostCarouselList';

const PostsTab = ({ user }) => {
  const { posts, username } = user;
  return <PostCarouselList posts={posts} loggedInUser={username} />;
};

const mapStateToProps = (state) => ({
  user: getUserData(state),
});

export default connect(mapStateToProps, null)(PostsTab);
