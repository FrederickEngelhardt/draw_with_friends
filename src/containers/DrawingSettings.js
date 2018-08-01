import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import {
  UncontrolledCollapse,
  Card,
  CardBody,
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
        <Button onClick={()=>{this.props.socket.emit('clear_canvas', {})}} className=".col-" color="danger" size="lg" active>Reset</Button>
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
      <div className="container DrawingSettings">
      <Button color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
      {'Show/Hide Tools'}
      </Button>
        <UncontrolledCollapse toggler="#toggler">
        <div className="dropDownMenu">
        <SettingsNav socket={drawing} settingSelector={settingSelector}/>
        <Layers socket={drawing} layersActive={user.settingSelector} layers={user.layers}/>
        <ColorSettings changeBrushSize={changeBrushSize} brush_height={user.brush_height} colorActive={user.settingSelector} changeColor={changeColor} selected_color={user.selected_color} state={user} />
        </div>
        </UncontrolledCollapse>
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
