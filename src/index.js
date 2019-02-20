import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import 'aframe'
import 'aframe-canvas'

import UserReducer from './reducers/user';
import RoutingContainer from "./containers/RoutingContainer";

import './assets/images/favicon.ico'
import 'styles/index.scss'

const store = createStore(
  UserReducer,
);


ReactDOM.render(
  <Provider store={store}>
    <RoutingContainer />
  </Provider>,
  document.getElementById('root')
);
