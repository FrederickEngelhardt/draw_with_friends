import React, { Component, PropTypes } from 'react';
import openSocket from 'socket.io-client';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActionCreators from '../actions/user';

// Stylesheets

import Canvas from '../components/Canvas'
import Layers from '../components/Layers'
import Chatbox from '../components/Chatbox'
const drawing = openSocket('http://localhost:3001/drawing')
const chat = openSocket('http://localhost:3001/chat')


class App extends Component {
  render() {
    const { dispatch, user } = this.props;
    console.log(this.props.user, "PROPS");
    const changeColor = bindActionCreators(UserActionCreators.changeColor, dispatch);
    console.log(user, changeColor);
    return (
      <div className="App">
        <Canvas state={user} socket={drawing} changeColor={changeColor}/>
        <Layers socket={drawing} layers={[1,2]}/>
        <Chatbox socket={chat} />
      </div>
    );
  }
}
const mapStateToProps = state => (
  {
    user: state
  }
);
export default connect(mapStateToProps)(App);
