import React from 'react';
import { LogBox, AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import MainTabBar from './src/navigation/MainTabBar';
import { ActionTypes } from './src/actions/auth';
import reducers from './src/reducers';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();// Ignore all log notifications

const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
));

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      store.dispatch({ type: ActionTypes.AUTH_USER });
    }
    return value;
  } catch (e) {
    return e;
  }
};

getData();

const App = (props) => {
  return (
    <Provider store={store}>
      <MainTabBar />
    </Provider>
  );
};

export default App;
