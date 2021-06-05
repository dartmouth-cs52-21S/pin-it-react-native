import {
  faUtensils, faRunning, faCamera, faGlassMartiniAlt, faPalette, faShoppingBag, faVolleyballBall, faMapMarked,
} from '@fortawesome/free-solid-svg-icons';

const categories = {
  Restaurant: {
    icon: faUtensils,
    style: {
      backgroundColor: '#4984F9',
    },
  },
  Bar: {
    icon: faGlassMartiniAlt,
    style: {
      backgroundColor: '#FC6079',
    },
  },
  Landmark: {
    icon: faCamera,
    style: {
      backgroundColor: '#FE9B3A',
    },
  },
  Park: {
    icon: faRunning,
    style: {
      backgroundColor: '#4FBE82',
    },
  },
  Art: {
    icon: faPalette,
    style: {
      backgroundColor: '#9381FF',
    },
  },
  Shopping: {
    icon: faShoppingBag,
    style: {
      backgroundColor: '#D974CF',
    },
  },
  Sports: {
    icon: faVolleyballBall,
    style: {
      backgroundColor: '#FFEE59',
    },
  },
  Poi: {
    icon: faMapMarked,
    style: {
      backgroundColor: '#7EAAFF',
    },
  },
};

// corresponding icon for place type (not actual category)
export const placeTypeToCategory = {
  amusement_park: 'Park',
  aquarium: 'Park',
  art_gallery: 'Art',
  bakery: 'Restaurant',
  bar: 'Bar',
  bowling_alley: 'Sports',
  cafe: 'Restaurant',
  campground: 'Park',
  casino: 'Bar',
  city_hall: 'Landmark',
  embassy: 'Landmark',
  gym: 'Sports',
  museum: 'Art',
  meal_delivery: 'Restaurant',
  meal_takeaway: 'Restaurant',
  night_club: 'Bar',
  park: 'Park',
  restaurant: 'Restaurant',
  stadium: 'Sports',
  tourist_attraction: 'Landmark',
  zoo: 'Park',
  point_of_interest: 'Poi',
  shopping_mall: 'Shopping',
  department_store: 'Shopping',
  jewelry_store: 'Shopping',
  furniture_store: 'Shopping',
  home_goods_store: 'Shopping',
  clothing_store: 'Shopping',
  store: 'Shopping',
  establishment: 'Shopping',
  food: 'Restaurant',
  landmark: 'Landmark',
};

export default categories;
