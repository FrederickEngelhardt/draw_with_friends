import React, { Component } from 'react';
import '../css/Canvas.css'
import AFRAME from 'aframe'
import { css } from 'emotion'

const defaultColors = [
  '#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00','#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'
]

export default class VrCanvas extends Component {
  constructor(props){
    super(props)
    this.state = {
      canvasData: this.props.canvasData,
      socket: this.props.socket,
      rectangle_width: this.props.state.brush_width,
      rectangle_height: this.props.state.brush_height,
      canvasWidth: null,
      canvasHeight: null,
      paintWidth: null,
      paintHeight: null,
      clickDown: false,
      alpha: 0.2,
      color_memory: defaultColors,
      selected_color: 'rgba(118,0,255,0.2)',
    }

    this.state.socket.on('update_session_canvas', (data) => {
        const canvas = this.refs.canvas,
              ctx = canvas.getContext("2d")

              ctx.fillStyle = data[data.length-1]
        const { canvasData } = this.state
        const update = [...canvasData, data]
        this.setState({canvasData: update})
        ctx.fillRect(...data)
      })
    this.state.socket.on('load_canvas', (data) => {
      const canvas = this.refs.canvas,
            ctx=canvas.getContext("2d");
      this.setState({canvasData: data})
      ctx.clearRect(0, 0, this.state.canvasWidth, this.state.canvasHeight)
      if (data.length === 0) {
        return ctx.clearRect(0,0,this.state.canvasWidth, this.state.canvasHeight)
      }
      return data.map((ele)=>{
        ctx.fillStyle = ele[ele.length-1]
        ele = ele.slice(0,4)
        return ctx.fillRect(...ele)
      })
    })
  }
  componentDidMount() {
    const canvas = this.refs.fakeCanvas

    // Prevents right click box menu
    canvas.oncontextmenu = function(e) {
      e.preventDefault()
    }

    /*
      Full Screen Canvas
    */
    this.resizeCanvas(true)

    // Listener to check if client is resized
    window.addEventListener("resize", this.resizeCanvas.bind(this));
  }

  componentDidUpdate() {
    console.log('COMPONENT WILL RECEIVE PROPS', this.props);
    const {state} = this.props
    if (this.state.rectangle_width !== state.brush_width){
      this.setState({
        rectangle_width: state.brush_width,
        rectangle_height: state.brush_height,
      })
    }
    if (this.state.selected_color !== this.props.state.selected_color){
      this.setState({
        selected_color: state.selected_color
      })
    }
  }
  resizeCanvas(initial) {
    // initial = true or the event sent from the listener.

    const canvasWidth = window.innerWidth,
          canvasHeight = window.innerHeight

    if (this.timedUpdate) {
      clearTimeout(this.timedUpdate)
    }
    else {
      this.setState({
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight,
        paintWidth: canvasWidth/4,
        paintHeight: canvasHeight/4,
      })
    }

    // Prevent Double Rendering
    if (initial === true) return

    // Update the newly generated canvas with the canvas coordinates.
    this.timedUpdate = setTimeout(()=>{
      const canvas = this.refs.canvas,
      ctx=canvas.getContext("2d")
      this.state.canvasData.map((ele)=>{
        console.log("THIS IS RESIZE DATA", ele);
        ctx.fillStyle = ele[ele.length-1]
        ele = ele.slice(0,4)
        return ctx.fillRect(...ele)
      })
    }, 200)
  }
  _canvasFill(x, y) {
    const canvas = this.refs.canvas,
          canvasBounds = canvas.getBoundingClientRect(),
          ctx=canvas.getContext("2d")
    ctx.fillStyle= this.state.selected_color
    ctx.fillRect(x,y,this.state.rectangle_width,this.state.rectangle_height)
    this.state.socket.emit('update_canvas', [x,y, this.state.rectangle_width,this.state.rectangle_height,this.state.selected_color])
  }
  handleClick = (e) => {
    console.log(e.target, e.clientX, e.clientY, e.button);
    if (e.button === 2 || e.button === 0){
      // Left(0) or right(0) click
      this.setState({clickDown: !this.state.clickDown})
    }
    else {
      return
    }
  }
  handleTouch = (e) => {
    e.preventDefault()
    this.setState({clickDown: !this.state.clickDown})
    console.log("updated state", e);
  }
  _onTouchMove(e) {
    e.preventDefault()
    // Detects the current coordinates of the mouse and draws
    const canvas = this.refs.canvas,
          canvasBounds = canvas.getBoundingClientRect(),
          ctx=canvas.getContext("2d"),
          offsetLeft = canvasBounds.left,
          offsetTop = canvasBounds.top
    const { rectangle_width, rectangle_height} = this.state

    // Do not need to change state to draw.
    const scaleX = this.state.canvasWidth/this.state.paintWidth
    const scaleY = this.state.canvasHeight/this.state.paintHeight
    const x = (e.touches[0].clientX -e.target.offsetLeft - rectangle_width/2)*scaleX,
          y = (e.touches[0].clientY -e.target.offsetTop - rectangle_height/2)*scaleY
    this._canvasFill(x, y)
  }
  _onMouseMove(e) {
    e.preventDefault()
    // Detects the current coordinates of the mouse and draws
    const canvas = this.refs.canvas,
          canvasBounds = canvas.getBoundingClientRect(),
          ctx=canvas.getContext("2d"),
          offsetLeft = canvasBounds.left,
          offsetTop = canvasBounds.top
    const { rectangle_width, rectangle_height} = this.state

    const scaleX = this.state.canvasWidth/this.state.paintWidth
    const scaleY = this.state.canvasHeight/this.state.paintHeight
    const x = (e.clientX -e.target.offsetLeft - rectangle_width/2)*scaleX,
          y = (e.clientY -e.target.offsetTop - rectangle_height/2)*scaleY
    this._canvasFill(x, y)
  }
  render() {
    return(
      <div
        ref={`fakeCanvas`} className={container()}>
        <div
        className={colorbox(this.state.paintWidth, this.state.paintHeight)}
        onTouchStart={this.handleTouch}
        onTouchMove={this.state.clickDown === true ? this._onTouchMove.bind(this) : () => false}
        onTouchEnd={this.handleTouch}
        // onMouseDown={this.handleClick}
        onMouseMove={this.state.clickDown === true ? this._onMouseMove.bind(this) : ()=>false}
        onMouseUp={()=>this.setState({clickDown: false})}
        ></div>
          <a-scene style={{position: 'absolute', width: '100%', height: '100%'}}>
            <a-assets>
              <canvas
               width={this.state.canvasWidth} height={this.state.canvasHeight} ref="canvas" id="my-canvas" crossOrigin="anonymous"></canvas>
            </a-assets>
            <a-entity
            cursor-listener
            position="-1 2 -3"
            geometry={`primitive: plane; height: ${this.state.canvasHeight/100}; width: ${this.state.canvasWidth/100}`}
            material="src: #my-canvas"
            draw-canvas="my-canvas"
            >
            </a-entity>
            <a-sky color="black"></a-sky>
          </a-scene>
      </div>

    )
  }
}

// Scoped CSS classes
const colorbox = (paintWidth, paintHeight) => {
  return (css`
    position: absolute;
    width: ${paintWidth}px;
    height: ${paintHeight}px;
    bottom: 0vh;
    left: 0vw;
    z-index: 5;
    background-color: rgba(239,223,187, 0.4);
    border-radius: 50px;
    `)
}

const container = () => {
  return css`
  position: absolute;
  height: 100%;
  width: 100%;
  `
}
