import Toast from 'react-native-toast-message';

export const ActionTypes = {
  SET_ERROR: 'SET_ERROR',
  SET_LOC_PERMISSION_GRANTED: 'SET_LOC_PERMISSION_GRANTED',
  SET_LOCATION: 'SET_LOCATION',
  CLEAR_LOCATION: 'CLEAR_LOCATION',
};

export const displayToast = (type, text1, text2) => {
  Toast.show({
    type, topOffset: 45, text1, text2,
  });
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
