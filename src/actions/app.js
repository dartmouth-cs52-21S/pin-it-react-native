export const ActionTypes = {
  SET_ERROR: 'SET_ERROR',
  SET_LOC_PERMISSION_GRANTED: 'SET_LOC_PERMISSION_GRANTED',
  SET_LOCATION: 'SET_LOCATION',
};

export function setError(error) {
  return {
    type: ActionTypes.SET_ERROR,
    payload: error,
  };
}

export function setLocPermissionGranted(locPermissionGranted) {
  return {
    type: ActionTypes.SET_LOC_PERMISSION_GRANTED,
    payload: locPermissionGranted,
  };
}

export function setLocation(location) {
  return {
    type: ActionTypes.SET_LOCATION,
    payload: location,
  };
}
