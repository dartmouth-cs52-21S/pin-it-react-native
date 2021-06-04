import { ActionTypes } from '../actions/user';

const initialState = {
  user_data: {},
  top_users: [],
};

const UserReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.GET_USER:
      return { ...state, user_data: payload };
    case ActionTypes.GET_TOP_USERS:
      return { ...state, top_users: payload };
    default:
      return state;
  }
};

export default UserReducer;
