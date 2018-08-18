import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActionCreators from '../actions/user';

// Stylesheets
import '../css/App.css'
import CanvasContainer from './CanvasContainer'
import DrawingSettings from './DrawingSettings'
import NavigationContainer from './NavigationContainer'

class DrawingPageContainer extends Component {
  render() {
    const { dispatch, user } = this.props;
    const updateSelectedSession = bindActionCreators(UserActionCreators.updateSelectedSession, dispatch);
    const path = this.props.location.pathname.split("/drawing/")[1]
    if (path !== user.selectedSession){
      updateSelectedSession(path)
    }
    return (
      <div className="App">
        <NavigationContainer />
        <DrawingSettings />
        <CanvasContainer />
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
