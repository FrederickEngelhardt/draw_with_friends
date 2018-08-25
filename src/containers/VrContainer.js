import React, { Component } from 'react';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActionCreators from '../actions/user';


import VrCanvas from '../components/VrCanvas'
// import Layers from '../components/Layers'
// import Chatbox from '../components/Chatbox'


class CanvasContainer extends Component {
  render() {
    const { dispatch, user } = this.props;
    const { drawing, chat, canvasData } = this.props.user
    const changeColor = bindActionCreators(UserActionCreators.changeColor, dispatch);
    const changeBrushSize = bindActionCreators(UserActionCreators.changeBrushSize, dispatch);
    const toggleDrawingTools = bindActionCreators(UserActionCreators.toggleDrawingTools, dispatch);
    return (
      <VrCanvas socket={drawing} state={user} changeColor={changeColor} toggleDrawingTools={toggleDrawingTools}/>
    );
  }
}


const mapStateToProps = state => (
  {
    user: state
  }
);
export default connect(mapStateToProps)(CanvasContainer);
