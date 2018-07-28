import React, { Component } from 'react';

// Stylesheets
import './App.css';

import Canvas from './containers/Canvas'

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
