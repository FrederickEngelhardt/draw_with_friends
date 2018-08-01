import React, { Component } from 'react';

// Stylesheets
import './css/App.css'
import Canvas_Container from './containers/CanvasContainer'
import Drawing_Settings from './containers/DrawingSettings'
import NavigationContainer from './containers/NavigationContainer'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationContainer />
        <div className="row">
          <div className="col-2">
            <Drawing_Settings />
          </div>
          <div className="col-8">
            <Canvas_Container />
          </div>
        </div>
      </div>
    )
  }
}
