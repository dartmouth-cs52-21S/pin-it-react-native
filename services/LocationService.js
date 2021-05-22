import axios from 'axios';

export const getLocationInfo = async (lat, long) => {
  const key = 'AIzaSyB5i9i5HT2Pk5AOokA7056tqFPvAdSXta4'; // GET RID OF THIS LATER
  const req = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${key}`;
  const response = await axios.get(req);
  const place = {
    address: response.data.results[0].formatted_address,
    place_id: response.data.results[0].place_id,
  };
  return place;
};

export const createLocation = async (location) => {
  const url = 'https://not-pin-it.herokuapp.com/api/locations';
  try {
    const response = await axios.post(url, location);
    return response;
  } catch (error) {
    return error;
  }
};
