import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActionCreators from '../actions/user';

// Stylesheets
// import '../css/App.css'

import Canvas from '../components/Canvas'
import Layers from '../components/Layers'
import Navigation from '../components/Navigation'
import Chatbox from '../components/Chatbox'


class Canvas_Container extends Component {
  render() {
    const { dispatch, user } = this.props;
    console.log(this.props.user, "PROPS");
    const { drawing, chat } = this.props.user
    const changeColor = bindActionCreators(UserActionCreators.changeColor, dispatch);
    const changeBrushSize = bindActionCreators(UserActionCreators.changeBrushSize, dispatch);
    console.log(user, changeColor);
    return (
      <div className="App">
        <Navigation socket={drawing} changeBrushSize={changeBrushSize} />
        <Canvas state={user} socket={drawing} changeColor={changeColor}/>
        <Layers socket={drawing} layers={[1,2]}/>
        <Chatbox socket={chat} />
      </div>
    );
  }
}
const mapStateToProps = state => (
  {
    user: state
  }
);
export default connect(mapStateToProps)(Canvas_Container);
