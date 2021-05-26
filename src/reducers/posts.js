import { ActionTypes } from '../actions/posts';

const initialState = {
  postList: [],
  currentPost: {},
};

const PostsReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.GET_POSTS:
      return { ...state, postList: payload };
    case ActionTypes.UPDATE_CURRENT_POST: {
      return { ...state, currentPost: payload };
    }
    default:
      return state;
  }
};

export default PostsReducer;
