import {SketchField, Tools} from 'react-sketch';
import React, { Component } from 'react';
import '../css/Sketch.css'
import openSocket from 'socket.io-client';
import Pixel from './Pixel'
const socket = openSocket('http://localhost:3001')

export default class Sketch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeColor: 'red',
      numberOfBoxes: 10000,
    }
  }
  componentDidMount(){
  }
  componentWillUnmount() {
    socket.emit('disconnect', {
      room: this.props.challenge.id
    })
  }
  render() {
    return (
      <div className="Sketch">
        <PixelBox numberOfBoxes={this.state.numberOfBoxes} activeColor={this.state.activeColor} />
      </div>
    )
  }
}

class PixelBox extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeColor: 'red',
      color: {color: 'red', id: 1},
      session_id: null,
    }
    socket.on('session_id', (payload) => {
      console.log(payload, "this is new id");
      this.setState({session_id: payload})
    })
    socket.on('connect', () => {
      console.log('connected!');
      socket.emit('room', '123')})
    socket.on('color_change', (data) => {
      console.log("THIS IS DATA IN ROOM 123",data)})
  }
  /*
    NEED: Function to check all Pixels. And update them based on their id.
  */
  componentDidMount(){
    console.log(this.state.color);
  }
  generatePixel(){
    let array = []
    for (var i = 0; i < this.props.numberOfBoxes; i++) {
      array.push(
        <Pixel
          id={i}
          socket={socket}
          activeColor={this.props.activeColor}
          changeColor={this.changeColor.bind(this)}/>)
    }
    return array
  }
  changeColor(id, color){
    console.log('Emitting Event to change to red')
    if (this.state.activeColor === 'yellow'){
      socket.emit(`client${this.state.session_id}_change_color`, {
        id: id,
        color: 'red',
      })
    }
    else if (this.state.activeColor === 'red'){
      console.log('Emitting Event to change to yellow, with id', id)
      socket.emit(`client${this.state.session_id}_change_color`, {
        id: id,
        color: 'yellow',
      })
    }
  }
  render(){
    return(
      <div className="SketchBox">
        {this.generatePixel()}
      </div>
    )
  }
}
