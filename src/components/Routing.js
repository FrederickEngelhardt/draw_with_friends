import React, { Component } from 'react'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import DrawingPageContainer from '../containers/DrawingPageContainer'
import HomePage from '../containers/HomePageContainer'


export default class Routing extends Component {
  constructor(props){
    super(props)
    this.state = {
      sessionList: this.props.sessionList || false,
      serverResponse: false,
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
    })
  }
  componentDidMount(){
    this.props.sessions.on('sessions', (data) => {
      this.setState({serverResponse: true})
      console.log('This is your sent sessions', data);
      data.map((element) => {
        console.log('this is element', element);
        this.setState({
          sessionList: [...this.state.sessionList, element]
        })
        this.props.addSession(element)
        return
      })
    })
  }

  /**
   * generateRoutes - generates all available routes sent to user.
   *
   * @return {JSX}  JSX of all routes
   */
  generateRoutes(){
    console.log(this.state.sessionList, "SESSION");
    // if (this.state.sessionList === false) return setTimeout(this.generateRoutes, 3000)
    const routes = this.state.sessionList.map((route) => {
      const routeString = `/drawing/${route}`
      console.log(routeString);
      return (<Route exact path={routeString} component={DrawingPageContainer} />)
      })
      if (this.state.serverResponse === false){
        return setTimeout(()=>{
          console.log('Timeout called');
          this.generateRoutes}, 3000)
      }
      else {
        return (
          <Router>
            <div>
              <Route exact path="/" component={HomePage} />
              {routes}
            </div>
          </Router>
        )
      }
  }
  render(){
    return (this.generateRoutes())
  }
}
const Refresh = ({ path = '/' }) => (
    <Route
        path={path}
        component={({ history, location, match }) => {
            history.replace({
                ...location,
                pathname:location.pathname.substring(match.path.length)
            });
            return null;
        }}
    />
);
