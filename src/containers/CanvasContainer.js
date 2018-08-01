import React, { Component } from 'react';
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
import Chatbox from '../components/Chatbox'


class CanvasContainer extends Component {
  render() {
    const { dispatch, user } = this.props;
    console.log(this.props.user, "PROPS");
    const { drawing, chat } = this.props.user
    const changeColor = bindActionCreators(UserActionCreators.changeColor, dispatch);
    const changeBrushSize = bindActionCreators(UserActionCreators.changeBrushSize, dispatch);
    console.log(user, changeColor);
    return (
      <div className="CanvasContainer">
        <div className="">
          <Canvas state={user} socket={drawing} changeColor={changeColor}/>
        </div>
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
export default connect(mapStateToProps)(CanvasContainer);
