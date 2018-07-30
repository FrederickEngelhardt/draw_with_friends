import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import UserReducer from './reducers/user';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
  UserReducer,
  window.devToolsExtension && window.devToolsExtension()
);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
