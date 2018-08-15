import React, { Component } from 'react';
import { Link, Redirect, withRouter } from "react-router-dom";



export default class NewSessionCard extends Component {
  openMenu(){
  }
  render(){
    return (
      <div className={`clickAnimation DrawingPageCard`}>
      <Link className={`DrawingPageCard`} to="/drawing">
      <button className={`shadow Button green`} onClick={this.openMenu()}></button>
      <h1 className={`buttonTitle extra-large-font`}> + </h1>
      </Link>
      </div>
    )
  }
}
