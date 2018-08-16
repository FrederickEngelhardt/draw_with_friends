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
import SettingsNav from '../components/SettingsNav'

class DrawingSettings extends Component {
  renderDrawingTools(dispatch, user){
    const { drawing, chat, selectedSession } = user
    const changeColor = bindActionCreators(UserActionCreators.changeColor, dispatch);
    const changeBrushSize = bindActionCreators(UserActionCreators.changeBrushSize, dispatch);
    const settingSelector = bindActionCreators(UserActionCreators.settingSelector, dispatch);
    return (
      <div className="drawing-settings">
        <div className="drawing-menu">
        <SettingsNav
          socket={drawing}
          settingSelector={settingSelector}
          />
        <Layers
          socket={drawing(selectedSession)}
          layersActive={user.settingSelector}
          layers={user.layers}
          />
        <ColorSettings
          changeBrushSize={changeBrushSize} brush_height={user.brush_height} colorActive={user.settingSelector} changeColor={changeColor} selected_color={user.selected_color}
          state={user}
          />
        </div>
      </div>
    );
  }
  render() {
    const { dispatch, user } = this.props;
    const renderThis = user.showDrawingTools ? this.renderDrawingTools(dispatch, user) : <div></div>
    return renderThis

  }
}
const mapStateToProps = state => (
  {
    user: state
  }
);
export default connect(mapStateToProps)(DrawingSettings);
