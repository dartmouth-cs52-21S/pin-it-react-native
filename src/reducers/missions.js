import { ActionTypes } from '../actions/missions';

const initialState = {
  currentMission: null,
  missionsList: [],
};

const MissionsReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.SET_MISSION:
      return { ...state, currentMission: payload };
    case ActionTypes.CLEAR_MISSION:
      return { ...state, currentMission: null };
    case ActionTypes.GET_MISSIONS:
      return { ...state, missionsList: payload };
    default:
      return state;
  }
};

export default MissionsReducer;
