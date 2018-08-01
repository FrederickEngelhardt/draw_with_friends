import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import {
  Button,
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
import '../css/DrawingSettings.css'

import Layers from '../components/Layers'
import ColorSettings from '../components/ColorSettings'

class SettingsNav extends Component {
  render(){
    console.log(this.props);
    const { settingSelector } = this.props
    return (
      <div className="container">
        <div className="row">
        <Button
            onClick={() => settingSelector('COLOR_MENU')}
            className=".col-"
            color="primary"
            size="1g"
            active
          >Colors</Button>
        <Button onClick={() => settingSelector('LAYER_MENU')} className=".col-" color="secondary" size="lg" active>Layers</Button>
        </div>
      </div>
    )
  }
}

class DrawingSettings extends Component {
  render() {
    const { dispatch, user } = this.props;
    const { drawing, chat } = user
    const changeColor = bindActionCreators(UserActionCreators.changeColor, dispatch);
    const changeBrushSize = bindActionCreators(UserActionCreators.changeBrushSize, dispatch);
    const settingSelector = bindActionCreators(UserActionCreators.settingSelector, dispatch);
    return (
      <div className="DrawingSettings">
        <SettingsNav settingSelector={settingSelector}/>
        <Layers socket={drawing} layersActive={user.settingSelector} layers={user.layers}/>
        <ColorSettings colorActive={user.settingSelector} changeColor={changeColor} selected_color={user.selected_color} state={user} />
      </div>
    );
  }
}
const mapStateToProps = state => (
  {
    user: state
  }
);
export default connect(mapStateToProps)(DrawingSettings);
