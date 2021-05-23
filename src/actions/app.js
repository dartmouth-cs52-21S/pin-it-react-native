export const ActionTypes = {
  SET_ERROR: 'SET_ERROR',
};

export function setError(error) {
  return {
    type: ActionTypes.SET_ERROR,
    message: error,
  };
}
