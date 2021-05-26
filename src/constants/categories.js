import {
  faUtensils, faRunning, faCamera, faGlassMartiniAlt, faPalette,
} from '@fortawesome/free-solid-svg-icons';

const categories = {
  Restaurant: {
    icon: faUtensils,
    style: {
      backgroundColor: '#2CA8C7',
    },
  },
  Activity: {
    icon: faRunning,
    style: {
      backgroundColor: '#19A33F',
    },
  },
  'Photo Spot': {
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

export default categories;
