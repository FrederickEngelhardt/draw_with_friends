import React, { Component } from 'react';

import '../css/Navigation.css'
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

export default class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  checkView() {
    if (this.props.view !== "home-view"){
      return (
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/FrederickEngelhardt/draw_with_friends">GitHub</NavLink>
            </NavItem>
            <NavItem>
            <NavLink onClick={()=>{this.props.toggleDrawingTools(!this.props.state.showDrawingTools)}}>
            Tools
            </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
              <DropdownItem onClick={()=>{this.props.toggleDrawingTools(!this.props.state.showDrawingTools)}}>
              Toggle Drawing Tools
              </DropdownItem>
              <DropdownItem onClick={()=>{this.props.changeBrushSize(80,80)}}>
              {`Small Brush`}
              </DropdownItem>
              <DropdownItem onClick={()=>{this.props.changeBrushSize(80,80)}}>
                {`Large Brush`}
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={()=>{this.props.socket.emit('clear_canvas', {})}}>
                {`Reset`}
              </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      )
    }
    else {
      return (
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/FrederickEngelhardt/draw_with_friends">GitHub</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      )
    }
  }
  render() {
    return (
      <div className={`NavigationSettings`}>
        <Navbar color="dark" dark expand={`xl`}>
          <NavbarBrand href="/">Draw-With-Friends</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          {this.checkView()}
        </Navbar>
      </div>
    );
  }
}
