import { ActionTypes } from '../actions/locations';

const initialState = {
  queriedLocationsList: [],
};

const LocationsReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.GET_QUERIED_LOCATIONS:
      return { ...state, queriedLocationsList: payload };
    default:
      return state;
  }
};

export default LocationsReducer;
