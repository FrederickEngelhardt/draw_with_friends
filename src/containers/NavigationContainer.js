import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActionCreators from '../actions/user';

import Navigation from '../components/Navigation'
class NavigationContainer extends Component {
  render(){
    const { dispatch, user } = this.props;
    const { drawing } = user
    const changeBrushSize = bindActionCreators(UserActionCreators.changeBrushSize, dispatch);
    const toggleDrawingTools = bindActionCreators(UserActionCreators.toggleDrawingTools, dispatch);
    const toggleVR = bindActionCreators(UserActionCreators.toggleVR, dispatch);
    return(
      <Navigation
        socket={drawing}
        view={this.props.view}
        changeBrushSize={changeBrushSize}
        toggleDrawingTools={toggleDrawingTools}
        toggleVR={toggleVR}
        state={user}
      />
    )
  }
}

const mapStateToProps = state => (
  {
    user: state
  }
);
export default connect(mapStateToProps)(NavigationContainer);
