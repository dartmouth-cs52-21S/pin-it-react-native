import { ActionTypes } from '../actions/locations';

const initialState = {
  locationsList: [],
};

const LocationsReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.GET_LOCATIONS:
      return { ...state, locationsList: payload };
    default:
      return state;
  }
};

export default LocationsReducer;
