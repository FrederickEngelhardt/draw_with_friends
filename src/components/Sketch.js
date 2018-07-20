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
    }
  }
  componentWillUnmount() {
    socket.emit('disconnect', {
      room: this.props.challenge.id
    })
  }
  render() {
    return (
      <div className="Sketch">
        <PixelBox numberOfBoxes={4} activeColor={this.state.activeColor} />
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
    }
    socket.on('update_color', (payload) => {
      console.log(payload, 'update color called');
      if (payload.id === this.state.pixel_id){
        this.setState({color: payload})
      }
    })
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
      socket.emit('client_change_color', {
        id: id,
        color: 'red',
      })
    }
    else if (this.state.activeColor === 'red'){
      console.log('Emitting Event to change to yellow')
      socket.emit('client_change_color', {
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
