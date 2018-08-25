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
    console.log(this.props.user, "PROPS");
    const { drawing, chat } = this.props.user
    const changeColor = bindActionCreators(UserActionCreators.changeColor, dispatch);
    const changeBrushSize = bindActionCreators(UserActionCreators.changeBrushSize, dispatch);
    const toggleDrawingTools = bindActionCreators(UserActionCreators.toggleDrawingTools, dispatch);
    console.log(user, changeColor);
    return (
      <VrCanvas socket={drawing}/>
    );
  }
}


// AFRAME REFERENCES
// <a-scene>
// <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
// <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
// <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
// <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
// <a-sky color="#ECECEC"></a-sky>
// </a-scene>


const mapStateToProps = state => (
  {
    user: state
  }
);
export default connect(mapStateToProps)(CanvasContainer);
