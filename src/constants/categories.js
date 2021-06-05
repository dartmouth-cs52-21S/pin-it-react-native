import {
  faUtensils, faRunning, faCamera, faGlassMartiniAlt, faPalette,
} from '@fortawesome/free-solid-svg-icons';

export const categories = {
  Restaurant: {
    icon: faUtensils,
    style: {
      backgroundColor: '#2CA8C7',
    },
  },
  Park: {
    icon: faRunning,
    style: {
      backgroundColor: '#19A33F',
    },
  },
  Landmark: {
    icon: faCamera,
    style: {
      backgroundColor: '#4984F9',
    },
  },
  Bar: {
    icon: faGlassMartiniAlt,
    style: {
      backgroundColor: '#FE9B3A',
    },
  },
  Art: {
    icon: faPalette,
    style: {
      backgroundColor: '#F9516C',
    },
  },
};

export const placeTypeToCategory = {
  amusement_park: 'Park',
  art_gallery: 'Art',
  bakery: 'Restaurant',
  bar: 'Bar',
  bowling_alley: 'Park',
  cafe: 'Restaurant',
  campground: 'Park',
  casino: 'Bar',
  museum: 'Art',
  night_club: 'Landmark',
  park: 'Park',
  restaurant: 'Restaurant',
  stadium: 'Park',
  tourist_attraction: 'Landmark',
  zoo: 'Landmark',
};

export default categories;
