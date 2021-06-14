import { ActionTypes } from '../actions/locations';

const initialState = {
  queriedLocationsList: [],
  currentLocation: { latitude: 0, longitude: 0 },
};

const LocationsReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.GET_QUERIED_LOCATIONS:
      return { ...state, queriedLocationsList: payload };
    case ActionTypes.SET_CURRENT_LOCATION:
      return { ...state, currentLocation: payload };
    default:
      return state;
  }
};

export default LocationsReducer;
