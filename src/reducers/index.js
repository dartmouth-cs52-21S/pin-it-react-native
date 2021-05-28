import { combineReducers } from 'redux';
import AuthReducer from './auth';
import PostsReducer from './posts';
import AppReducer from './app';
import LocationsReducer from './locations';

const rootReducer = combineReducers({
  auth: AuthReducer,
  posts: PostsReducer,
  app: AppReducer,
  locations: LocationsReducer,
});

export default rootReducer;
