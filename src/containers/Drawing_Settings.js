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
import '../css/Drawing_Settings.css'

import Layers from '../components/Layers'
import ColorSettings from '../components/ColorSettings'


class Drawing_Settings extends Component {
  render() {
    const { dispatch, user } = this.props;
    const { drawing, chat } = user
    const changeColor = bindActionCreators(UserActionCreators.changeColor, dispatch);
    const changeBrushSize = bindActionCreators(UserActionCreators.changeBrushSize, dispatch);
    return (
      <div className="Drawing_Settings">
        <Layers socket={drawing}/>
        <ColorSettings changeColor={changeColor} selected_color={user.selected_color} state={user} />
      </div>
    );
  }
}
const mapStateToProps = state => (
  {
    user: state
  }
);
export default connect(mapStateToProps)(Drawing_Settings);
