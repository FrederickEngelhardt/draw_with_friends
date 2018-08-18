import React, { Component } from 'react'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import DrawingPageContainer from '../containers/DrawingPageContainer'
import HomePage from '../containers/HomePageContainer'


export default class Routing extends Component {
  constructor(props){
    super(props)
    this.state = {
      sessionList: this.props.sessionList
    }
    this.props.sessions.on('update_sessions', (data) => {
      console.log('This is your sent sessions', data);
      data.map((element) => {
        console.log('this is element', element);
        this.setState({
          sessionList: [...this.state.sessionList, element]
        })
        this.props.addSession(element)
        return
      })
      // Also need to update the global sessions
    })
  }
  componentDidMount(){
    this.props.sessions.on('sessions', (data) => {
      console.log('This is your sent sessions', data);
      data.map((element) => {
        console.log('this is element', element);
        this.setState({
          sessionList: [...this.state.sessionList, element]
        })
        this.props.addSession(element)
        return
      })
      // Also need to update the global sessions
    })
  }

  /**
   * generateRoutes - generates all available routes sent to user.
   *
   * @return {JSX}  JSX of all routes
   */
  generateRoutes(){
    const routes = this.state.sessionList.map((route) => {
      const routeString = `/drawing/${route}`
      console.log(routeString);
      return (<Route exact path={routeString} component={DrawingPageContainer} />)
      })
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
          {routes}
        </div>
      </Router>
    )
  }
  render(){
    return (this.generateRoutes())
  }
}
