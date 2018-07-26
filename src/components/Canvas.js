import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/Canvas.css'
import '../css/ColorPicker.css'
import { AlphaPicker, HuePicker, CompactPicker } from 'react-color';
import Chatbox from './Chatbox.js'
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001')
// const socket = openSocket('https://draw-with-friends-server.herokuapp.com/')

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
      canvasWidth: 500,
      canvasHeight: 500,
      alpha: 0.2,
      color_memory: defaultColors,
      selected_color: 'rgba(0,0,0,0.2)',
      clickDown: false
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
    e.preventDefault()
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
    let {color_memory} = this.state
    color_memory = color_memory.slice(0,color_memory.length - 1)
    console.log(color_memory);
    color_memory.unshift(`rgba(${r},${g},${b},${a})`)
    console.log(color_memory);
    this.setState({
      selected_color: `rgba(${r},${g},${b},${a})`,
      color_memory: color_memory  })
    console.log(this.state.selected_color);
  }
  _handleChangeSavedColor = (color, event) => {
    let {r,g,b,a} = color.rgb
    // Replace default color alpha with state alpha
    a = this.state.alpha
    this.setState({
      selected_color: `rgba(${r},${g},${b},${a})`})
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
          style={{cursor: `url('data:image/svg+xml;utf8,<svg fill="blue" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 500 500">            <path id="Rectangle" fill="${this.state.selected_color}" transform="rotate(45 91 234)" d="M19 194h145v80H19z"/><path fill="black" stroke="black" d="M315 10a34 34 0 0 0-48 0l-97 107-31-31a23 23 0 0 0-33 0l-50 51a6 6 0 0 0 0 8l2 3-56 56a6 6 0 0 0 0 9l44 44 66 66a6 6 0 0 0 9 0l56-56 3 2a6 6 0 0 0 8 0l51-50c9-9 9-24 0-33l-31-31 107-97c13-13 13-35 0-48zM116 311l-13-14 23-23a6 6 0 0 0-8-9l-24 23-13-13 23-23a6 6 0 1 0-9-9l-23 23-13-13 23-23a6 6 0 0 0-9-9l-23 23-13-13 22-23a6 6 0 0 0-8-9l-23 23-14-13 53-53 102 102-53 53zm114-101l-46 47L68 141l47-46c2-2 5-4 8-4s6 2 8 4l35 35 29 29 35 35c5 5 5 12 0 16zm77-161l-107 98-22-22 98-107c4-4 9-6 15-6s12 2 16 6c8 9 8 23 0 31z"/></svg>') 0 40, auto`}}
          className="canvas"
          height={this.state.canvasHeight}
          width={this.state.canvasWidth}
          onMouseDown={() => this.setState({clickDown: !this.state.clickDown})}
          onMouseMove={this.state.clickDown === true ? this._onMouseMove.bind(this) : false}
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
              onChangeComplete= { this._handleChangeSavedColor}
              />
          </div>
          <Chatbox socket={socket}/>
      </div>
    )
  }
}
