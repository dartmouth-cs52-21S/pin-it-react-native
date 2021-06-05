import { ActionTypes } from '../actions/user';

const initialState = {
  user_data: {},
  top_users: {},
  user_rank_info: {},
};

const UserReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.GET_USER:
      return { ...state, user_data: payload };
    case ActionTypes.GET_TOP_USERS:
      return { ...state, top_users: payload };
    case ActionTypes.GET_USER_RANK_INFO:
      return { ...state, user_rank_info: payload };
    default:
      return state;
  }
};

export default UserReducer;
