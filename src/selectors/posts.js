export const getPosts = (state) => state.posts.postList;

export const getCurrentPost = (state) => {
  const { location } = state.app;
  const { imageUrls, caption } = state.posts.currentPost;

  return ({
    imageUrls,
    caption,
    location,
  });
};
