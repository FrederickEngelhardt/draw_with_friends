import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Iframe from 'react-iframe'


// Stylesheets
import '../../css/App.css'
import '../../css/HomePage.css'

import NavigationContainer from '../../containers/NavigationContainer'
import NewSessionCard from './NewSessionCard'
import RecentSessionCard from './RecentSessionCard'

export default class HomePage extends Component {
  render() {
    return (
      <div className="App">
        <NavigationContainer view={`home-view`}/>
        <div className={`click home-flex`}>
          <NewSessionCard />
          <RecentSessionCard />
        </div>
      </div>
    )
  }
}



/*
  NOTE: iFrame will be used for showing the top session.
*/
// <Iframe url="./drawing"
// width="500"
// height="100%"
// id="myId"
// className="shadow clickAnimation displayCard"
// display="initial"
// position="relative"
// onClick={console.log('test')}
// allowFullScreen/>
