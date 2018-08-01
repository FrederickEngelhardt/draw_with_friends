import React, { Component } from 'react';

// Stylesheets
import './css/App.css'
import Canvas_Container from './containers/CanvasContainer'
import Drawing_Settings from './containers/DrawingSettings'

export default class App extends Component {
  render() {
    return (
      <div>
        <Canvas_Container />
        <Drawing_Settings />
      </div>
    )
  }
}
