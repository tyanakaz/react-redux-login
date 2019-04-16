import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { createBrowserHistory }from 'history';
import * as reducers from './reducers';

import thunk from 'redux-thunk';

import logger from 'redux-logger';

const history = createBrowserHistory();

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  applyMiddleware(
    logger,
    thunk,
    routerMiddleware(history)
  )
);

ReactDOM.render(
<Provider store={store}>
  <ConnectedRouter history={history}>
    <App />
  </ConnectedRouter>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
