import React, { Component } from 'react'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import DrawingPage from './DrawingPage'
import HomePage from './HomePage/HomePage'
export default class Routing extends Component {
  generateRoutes(){
    // Default routes
    return (
      <Route exact path="/drawing" component={DrawingPage} />
    )
  }
  render(){
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
        </div>
      </Router>
    )
  }
}
