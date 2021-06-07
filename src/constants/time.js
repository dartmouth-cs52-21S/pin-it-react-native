/* eslint-disable import/prefer-default-export */
export const getTimeString = (milliseconds) => {
  const min = Math.floor(milliseconds / (1000 * 60));

  const hrs = Math.floor(min / 60);
  if (hrs < 1) return `${min} min`;

  const days = Math.floor(hrs / 24);
  if (days < 1) return `${hrs} hrs`;

  const weeks = Math.floor(days / 7);
  if (weeks < 1) return `${days} days`;

  return `${weeks} weeks`;
};
