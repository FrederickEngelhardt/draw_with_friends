import React, { Component } from 'react';

// Stylesheets
import '../css/App.css'
import Canvas_Container from '../containers/CanvasContainer'
import Drawing_Settings from '../containers/DrawingSettings'
import NavigationContainer from '../containers/NavigationContainer'

export default class DrawingPage extends Component {
  render() {
    return (
      <div className="App">
        <NavigationContainer />
        <Drawing_Settings />
        <Canvas_Container />
      </div>
    )
  }
}
