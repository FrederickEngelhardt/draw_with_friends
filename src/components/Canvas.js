import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/Canvas.css'
class Canvas extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      x: undefined,
      y: undefined,
      mouseDown: false,
      canvasWidth: 500,
      canvasHeight: 500
    }
  }
  componentDidMount() {
    // Set the height of the canvas based on the smallest screen dimension size.
    const canvasWidth = window.innerHeight > window.innerWidth ? window.innerWidth*.9 : window.innerHeight*.9,
          canvasHeight = window.innerHeight > window.innerWidth ? window.innerWidth*.9 : window.innerHeight*.9
    console.log(canvasWidth, canvasHeight, 'w/H!@#!@#');
    this.setState({
      canvasWidth: canvasWidth,
      canvasHeight: canvasHeight
    })
  }
  _onMouseMove(e) {
    // Detects the current coordinates of the mouse and draws
    const canvas = this.refs.canvas,
          canvasBounds = canvas.getBoundingClientRect(),
          offsetLeft = canvasBounds.left,
          offsetTop = canvasBounds.top

    // Set the State of the current coordinates
    this.setState({ x: (e.screenX-offsetLeft), y: (e.screenY-offsetTop) });

    let ctx=canvas.getContext("2d");
    ctx.fillStyle="#FF0000";
    ctx.fillRect(this.state.x,this.state.y,10,10)
  }
  render() {
    return(
      <div style={{height: '100vh', backgroundColor: 'blue'}}>
        <canvas
          style={{backgroundColor: 'white'}}
          height={this.state.canvasHeight}
          width={this.state.canvasWidth}
          onMouseMove={this._onMouseMove.bind(this)}
          ref="canvas"/>
      </div>
    )
  }
}
export default Canvas
// height: '100vh', width: 500,
