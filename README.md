<img width="288" alt="Screen Shot 2021-05-22 at 5 59 43 PM" src="https://user-images.githubusercontent.com/77286845/119244667-9b62e380-bb27-11eb-8b63-fbde30829525.png">
# Pin-It React Native

![Team Photo](https://user-images.githubusercontent.com/52898557/118916227-1e035d00-b8f4-11eb-9403-fc47679e1dfc.png)

This is the frontend repository for our CS52 final project, Pin-It (*name subject to change*). Pin-It is a mobile app that challenges users to explore their surroundings by suggesting new locations to visit nearby.

## All app repositories
- [Front-end, mobile app](https://github.com/dartmouth-cs52-21S/pin-it-react-native)
- [Front-end, web app](https://github.com/dartmouth-cs52-21S/pin-it-web)
- [Back-end](https://github.com/dartmouth-cs52-21S/pin-it-api)

## Architecture

The following is a general overview of the project structure.

- **App.js** - highest level App component and redux provider
- **actions/** - redux actions for users, posts, app
- **assets/** - all images and icons
- **components/** - React components
- **navigation/** - stack navigators and main tab navigator
- **reducers/** - reducers for users, posts, app
- **screens/** - containers for the components
- **selectors/** - functions to select redux state items


## Setup

To start developing, run `npm install`, then `expo start` or `npm start`. This will allow you to run the app on a simulator or your phone if you have the Expo Go app.

Note: Although the app is using currently using Expo, we are planning to eject it some time in the future.

## Deployment

The expo app is accessible with this ![qr code](https://user-images.githubusercontent.com/77286845/119244667-9b62e380-bb27-11eb-8b63-fbde30829525.png). Unfortunately you have to be logged in to access it with an iphone so... heres our info. Expo email: cs52goats@gmail.com, password: cs52dart

The web frontend is deployed [here](https://xenodochial-pasteur-c84734.netlify.app/) on Netlify and the Express-Mongo API server is hosted [here](https://not-pin-it.herokuapp.com/) on Heroku.

## Authors
This repository contains the contributions of

- Eunice Kweon ([@eunicekweon](https://github.com/eunicekweon))
- Jack Banhanyon ([@JackBDart](https://github.com/JackBDart))
- Lizzie Hernandez ([@lizziehv](https://github.com/lhvidea))
- Luis Chamorro ([@luis-chamorro](https://github.com/luis-chamorro))
- Snow Kang ([@snow-kang](https://github.com/snow-kang))
- Wylie Kasai ([@wyliekasai](https://github.com/wyliekasai))

## Acknowledgments

Thank you Prof. Tim and our TA Jordan!
