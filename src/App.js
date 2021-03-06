import React, { Component } from 'react';
import 'aframe'
import 'aframe-canvas'
// Stylesheets
import './css/App.css'

// Components
import RoutingContainer from './containers/RoutingContainer'

/**
  App Points to Routing Controllers
*/
export default class App extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <RoutingContainer />
    )
  }
}
