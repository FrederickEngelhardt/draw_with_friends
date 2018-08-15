import React, { Component } from 'react';

// Stylesheets
import './css/App.css'

// Components
import SessionRoutingContainer from './containers/SessionRoutingContainer'

/**
  App Points to Routing Controllers
*/
export default class App extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <SessionRoutingContainer />
    )
  }
}
