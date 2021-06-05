import { ActionTypes } from '../actions/user';

const initialState = {
  userData: {},
  topUsers: [],
  userRankInfo: {},
};

const UserReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.GET_USER:
      return { ...state, userData: payload };
    case ActionTypes.GET_TOP_USERS:
      return { ...state, topUsers: payload };
    case ActionTypes.GET_USER_RANK_INFO:
      return { ...state, userRankInfo: payload };
    default:
      return state;
  }
};

export default UserReducer;
