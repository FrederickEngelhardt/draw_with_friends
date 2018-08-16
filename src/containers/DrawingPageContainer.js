import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActionCreators from '../actions/user';

// Stylesheets
import '../css/App.css'
import Canvas_Container from './CanvasContainer'
import Drawing_Settings from './DrawingSettings'
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
        <Drawing_Settings />
        <Canvas_Container />
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
