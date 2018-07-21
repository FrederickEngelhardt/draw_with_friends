import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import Sketch from './components/Sketch'
// import Pixel from './components/Pixel'
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
