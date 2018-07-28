import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import App from './App';
import UserReducer from './src/reducers/user';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
  // # REDUCER NAME,
  window.devToolsExtension && window.devToolsExtension()
);


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
