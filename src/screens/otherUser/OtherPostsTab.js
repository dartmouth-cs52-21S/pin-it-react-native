import React from 'react';
import { connect } from 'react-redux';
import { getUserData } from '../../selectors/user';
import PostCarouselList from '../../components/PostCarouselList';

const PostsTab = (props) => {
  const { posts, user } = props;
  const { username } = user;
  return <PostCarouselList posts={posts} loggedInUser={username} />;
};
const mapStateToProps = (state) => ({
  user: getUserData(state),
});

export default connect(mapStateToProps, null)(PostsTab);
