import { combineReducers } from 'redux';
import AuthReducer from './auth';
import PostsReducer from './posts';
import AppReducer from './app';
import LocationsReducer from './locations';
import MissionsReducer from './missions';

const rootReducer = combineReducers({
  auth: AuthReducer,
  posts: PostsReducer,
  app: AppReducer,
  locations: LocationsReducer,
  missions: MissionsReducer,
});

export default rootReducer;
