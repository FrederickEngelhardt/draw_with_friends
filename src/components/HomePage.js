import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Iframe from 'react-iframe'


// Stylesheets
import '../css/App.css'
import '../css/HomePage.css'

import NavigationContainer from '../containers/NavigationContainer'

export default class HomePage extends Component {
  render() {
    return (
      <div className="App">
        <NavigationContainer view={`home-view`}/>
        <div className={`click home-flex`}>
          <DrawingPageCard />
          <GamePageCard />
        </div>
      </div>
    )
  }
}
class DrawingPageCard extends Component {
  render() {
      return (
        <div className={`clickAnimation DrawingPageCard`}>

            <Link className={`DrawingPageCard`} to="/drawing">
              <button className={`shadow Button green`}></button>
            </Link>
            <h1 className={`buttonTitle extra-large-font`}> + </h1>
        </div>
    )
  }
}
const GamePageCard = () => {
  return (
    <div className={`clickAnimation DrawingPageCard`}>

        <Link className={`DrawingPageCard`} to="/drawing">
          <button className={`shadow Button blue`}></button>
        </Link>
        <h1 className={`buttonTitle`}> Recent Session </h1>
    </div>
  )
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
