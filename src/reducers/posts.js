import { ActionTypes } from '../actions/posts';

const initialState = {
  postList: [],
  uploadedImgUrl: null,
};

const PostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_POSTS:
      return { ...state, postList: action.payload };
    case ActionTypes.SET_UPLOADED_IMG:
      return { ...state, uploadedImgUrl: action.payload };
    default:
      return state;
  }
};

export default PostsReducer;
