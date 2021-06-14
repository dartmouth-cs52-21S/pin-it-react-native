export const ActionTypes = {
  SET_BADGES: 'SET_BADGES',
};

export const setBadges = (badges) => ({
  type: ActionTypes.SET_BADGES,
  payload: badges,
});
