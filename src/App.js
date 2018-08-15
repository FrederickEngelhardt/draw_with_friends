import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Stylesheets
import './css/App.css'

// Components
import HomePage from './components/HomePage'
import DrawingPage from './components/DrawingPage'


export default class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/drawing" component={DrawingPage} />
          </div>
        </Router>
    )
  }
}
// <DrawingPage />
