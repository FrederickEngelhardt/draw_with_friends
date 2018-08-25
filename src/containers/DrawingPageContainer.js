import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActionCreators from '../actions/user';

// Stylesheets
import '../css/App.css'
import CanvasContainer from './CanvasContainer'
import DrawingSettings from './DrawingSettings'
import NavigationContainer from './NavigationContainer'
import VrContainer from './VrContainer'

class DrawingPageContainer extends Component {
  state = {
    isVrEnabled: this.props.user.isVrEnabled
  }
  componentDidUpdate(){
    if (this.props.user.isVrEnabled !== this.state.isVrEnabled){
      this.setState({isVrEnabled: !this.state.isVrEnabled})
    }
  }
  render() {
    const { dispatch, user } = this.props;
    const updateSelectedSocketSession = bindActionCreators(UserActionCreators.updateSelectedSocketSession, dispatch);
    const path = this.props.location.pathname.split("/drawing/")[1]
    if (path !== user.selectedSession){
      updateSelectedSocketSession(path)
    }
    const isVrEnabled = this.state.isVrEnabled ? <VrContainer /> : <CanvasContainer />
    return (
      <div className="App">
        <NavigationContainer />
        <DrawingSettings />
        {isVrEnabled}
      </div>
    )
  }
}

const mapStateToProps = state => (
  {
    user: state
  }
);
export default connect(mapStateToProps)(DrawingPageContainer);
