import { ActionTypes } from '../actions/missions';

const initialState = {
  currentMission: null,
};

const MissionsReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.SET_MISSION:
      return { ...state, currentMission: payload };
    case ActionTypes.CLEAR_MISSION:
      return { ...state, currentMission: null };
    default:
      return state;
  }
};

export default MissionsReducer;
