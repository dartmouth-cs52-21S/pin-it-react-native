import { ActionTypes } from '../actions/app';

const initialState = {
  error: null,
  location: null,
  locPermissionGranted: true,
};

const AppReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.SET_ERROR:
      return { ...state, error: payload };
    case ActionTypes.SET_LOC_PERMISSION_GRANTED:
      return { ...state, locPermissionGranted: payload };
    case ActionTypes.SET_LOCATION:
      return { ...state, location: payload };
    case ActionTypes.CLEAR_LOCATION:
      return { ...state, location: null };
    default:
      return state;
  }
};

export default AppReducer;
