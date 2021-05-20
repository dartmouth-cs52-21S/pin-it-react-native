# Project Name

![Team Photo](https://user-images.githubusercontent.com/52898557/118916110-edbbbe80-b8f3-11eb-9bd8-db6e92e4070d.png)


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
- **models/** - schema for different data types
- **controllers/** - controllers for the data models
- **server.js** - the CRUD API server
- **router.js** - routes for the API server requests


## Setup

To start developing, run `npm install`, then `expo start` or `npm start`. This will allow you to run the app on a simulator or your phone if you have the Expo Go app.

Note: Although the app is using currently using Expo, we are planning to eject it some time in the future.

## Deployment

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
