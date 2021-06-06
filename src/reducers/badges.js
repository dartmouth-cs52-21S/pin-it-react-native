import { ActionTypes } from '../actions/badges';

const initialState = {
  badgeList: [],
};

const BadgesReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.SET_BADGES:
      return { ...state, badgeList: payload };
    default:
      return state;
  }
};

export default BadgesReducer;
