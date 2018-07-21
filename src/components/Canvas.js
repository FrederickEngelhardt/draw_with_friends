import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/Canvas.css'

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001')

class Canvas extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      x: undefined,
      y: undefined,
      rectangle_width: 20,
      rectangle_height: 20,
      mouseDown: false,
      canvasWidth: 500,
      canvasHeight: 500,
    }
    socket.on('update_session_canvas', (data) => {
      const canvas = this.refs.canvas,
            canvasBounds = canvas.getBoundingClientRect(),
            offsetLeft = canvasBounds.left,
            offsetTop = canvasBounds.top,
            ctx=canvas.getContext("2d");
      ctx.fillStyle="#FF0000";
      data.map((element)=>{
        return ctx.fillRect(...element)})
      ctx.fillRect(this.state.x,this.state.y,10,10)
    })
    socket.on('load_canvas', (data) => {
      const canvas = this.refs.canvas,
            ctx=canvas.getContext("2d");
            ctx.fillStyle="#FF0000";
      return data.map((ele)=>{return ctx.fillRect(...ele)})
    })
  }
  componentDidMount() {
    // Set the height of the canvas based on the smallest screen dimension size.
    const canvasWidth = window.innerHeight > window.innerWidth ? window.innerWidth*.9 : window.innerHeight*.9,
          canvasHeight = window.innerHeight > window.innerWidth ? window.innerWidth*.9 : window.innerHeight*.9
    console.log(this.refs.canvas.getBoundingClientRect());
    this.setState({
      canvasWidth: canvasWidth,
      canvasHeight: canvasHeight,
    })
  }
  _onMouseMove(e) {
    // Detects the current coordinates of the mouse and draws
    const canvas = this.refs.canvas,
          canvasBounds = canvas.getBoundingClientRect(),
          offsetLeft = canvasBounds.left,
          offsetTop = canvasBounds.top

    // Set the State of the current coordinates
    this.setState({ x: (e.clientX-offsetLeft), y: (e.clientY-offsetTop) });
    if (this.state.x === undefined || this.state.y === undefined) return

    let ctx=canvas.getContext("2d");
    ctx.fillStyle="#FF0000";
    ctx.fillRect(this.state.x,this.state.y,this.state.rectangle_width,this.state.rectangle_height)

    socket.emit('update_canvas', [this.state.x, this.state.y, this.state.rectangle_width, this.state.rectangle_height])
  }
  _clearCanvas() {
    this.refs.canvas.getContext("2d").clearRect(0, 0, this.state.canvasWidth, this.state.canvasHeight)
    socket.emit("clear_canvas", {})
  }
  render() {
    return(
      <div style={{height: '100vh', backgroundColor: 'blue'}}>
        <canvas
          className="canvas"
          height={this.state.canvasHeight}
          width={this.state.canvasWidth}
          onMouseMove={this._onMouseMove.bind(this)}
          ref="canvas"/>
          <button onClick={this._clearCanvas.bind(this)}>CLICK ME</button>
      </div>
    )
  }
}
export default Canvas
// height: '100vh', width: 500,
