import React, { Component } from 'react';

/*
  Bootstrap
*/
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';

// Stylesheets
import './App.css';

import Canvas from './components/Canvas'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Canvas />
      </div>
    );
  }
}

export default App;
