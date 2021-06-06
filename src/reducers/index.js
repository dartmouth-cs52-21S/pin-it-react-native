import { combineReducers } from 'redux';
import AuthReducer from './auth';
import PostsReducer from './posts';
import AppReducer from './app';
import LocationsReducer from './locations';
import UserReducer from './user';
import MissionsReducer from './missions';
import BadgesReducer from './badges';

const rootReducer = combineReducers({
  auth: AuthReducer,
  posts: PostsReducer,
  app: AppReducer,
  locations: LocationsReducer,
  user: UserReducer,
  missions: MissionsReducer,
  badges: BadgesReducer,
});

export default rootReducer;
