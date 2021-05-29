import { ActionTypes } from '../actions/user';

const initialState = {
  user_data: {},
};

const UserReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.GET_USER:
      return { ...state, user_data: payload };
    default:
      return state;
  }
};

export default UserReducer;
