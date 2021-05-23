import { combineReducers } from 'redux';
import AuthReducer from './auth';
import PostsReducer from './posts';

const rootReducer = combineReducers({
  auth: AuthReducer,
  posts: PostsReducer,
});

export default rootReducer;
