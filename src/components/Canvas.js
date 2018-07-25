import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/Canvas.css'
import '../css/ColorPicker.css'
import { AlphaPicker, HuePicker, CompactPicker } from 'react-color';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001')

const defaultColors = [
  '#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00','#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'
]

export default class Canvas extends React.Component {
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
      alpha: 0.2,
      color_memory: defaultColors,
      selected_color: 'rgba(0,0,0,0.2)',
    }
    socket.on('update_session_canvas', (data) => {
      const canvas = this.refs.canvas,
            canvasBounds = canvas.getBoundingClientRect(),
            offsetLeft = canvasBounds.left,
            offsetTop = canvasBounds.top,
            ctx=canvas.getContext("2d");
      // Note we will have to reconfigure this so that color is parsed through on the ws emit
      return [data[0]].map((element, index)=>{
        // NOTE: data[1] is a list of numbers.
        ctx.fillStyle=[data[1]][index]
        return ctx.fillRect(...element)
      })
    })
    socket.on('load_canvas', (data) => {
      console.log('called load_canvas');
      const canvas = this.refs.canvas,
            ctx=canvas.getContext("2d");
      if (data.length === 0) {
        return ctx.clearRect(0,0,this.state.canvasWidth, this.state.canvasHeight)
      }
      return data[0].map((ele, index)=>{
        ctx.fillStyle=data[1][index]
        return ctx.fillRect(...ele)
      })
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
    this.setState({ x: (e.clientX-offsetLeft), y: (e.clientY-offsetTop) })
    if (this.state.x === undefined || this.state.y === undefined) return

    let ctx=canvas.getContext("2d")
    ctx.fillStyle= this.state.selected_color
    console.log("filled with color", this.state.selected_color);
    ctx.fillRect(this.state.x,this.state.y,this.state.rectangle_width,this.state.rectangle_height)

    socket.emit('update_canvas', [this.state.x, this.state.y, this.state.rectangle_width, this.state.rectangle_height,this.state.selected_color])
  }

  _clearCanvas() {
    this.refs.canvas.getContext("2d").clearRect(0, 0, this.state.canvasWidth, this.state.canvasHeight)
    socket.emit("clear_canvas", {})
  }

  _handleChangeComplete = (color, event) => {
    let {r,g,b,a} = color.rgb
    // Replace default color alpha with state alpha
    a = this.state.alpha
    this.setState({ selected_color: `rgba(${r},${g},${b},${a})` })
    console.log(this.state.selected_color);
  }
  _handleChangeCompleteAlpha = (color, event) => {
    // Locate RGBA in color and reformat
    let {r,g,b,a} = color.rgb
    color = `rgba(${r},${g},${b},${a})`
    this.setState({
      selected_color: color,
      alpha: a
    })
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
        <button onClick={this._clearCanvas.bind(this)}>Click to Reset</button>
          <div className="colorPicker">
            <HuePicker
              color={this.state.selected_color}
              onChangeComplete={this._handleChangeComplete} />
            <AlphaPicker
              color={this.state.selected_color}
              onChangeComplete={ this._handleChangeCompleteAlpha } />
            <CompactPicker
              colors={this.state.color_memory}
              />
          </div>
      </div>
    )
  }
}
