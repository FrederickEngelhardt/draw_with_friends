import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Sketch from './components/Sketch'
import Pixel from './components/Pixel'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Sketch />
      </div>
    );
  }
}

export default App;
