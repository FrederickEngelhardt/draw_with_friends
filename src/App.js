import React, { Component } from 'react';

// Stylesheets
import './css/App.css'
import Canvas_Container from './containers/Canvas_Container'
import Drawing_Settings from './containers/Drawing_Settings'

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
