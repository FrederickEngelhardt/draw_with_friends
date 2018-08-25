import React, { Component } from 'react';
import '../css/Canvas.css'
import AFRAME from 'aframe'

const defaultColors = [
  '#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00','#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'
]

export default class VrCanvas extends Component {
  constructor(props){
    super(props)
    this.state = {
      canvasData: [],
      socket: this.props.socket,
      canvasWidth: null,
      canvasHeight: null,
    }

    this.state.socket.on('update_session_canvas', (data) => {
        const canvas = this.refs.canvas,
              ctx = canvas.getContext("2d")

              ctx.fillStyle = data[data.length-1]
              data = data.slice(0,4)
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
        console.log(ele);
        return ctx.fillRect(...ele)
      })
    })
  }
  componentDidMount() {
    /*
      Full Screen Canvas
    */
    this.resizeCanvas(true)

    // Listener to check if client is resized
    window.addEventListener("resize", this.resizeCanvas.bind(this));
  }
  resizeCanvas(initial) {
    // initial = true or the event sent from the listener.

    const canvasWidth = window.innerWidth,
          canvasHeight = window.innerHeight

    if (this.timedUpdate) {
      clearTimeout(this.timedUpdate)
    }
    else {

    }
    this.setState({
      canvasWidth: canvasWidth,
      canvasHeight: canvasHeight
    })

    // Prevent Double Rendering
    if (initial === true) return

    // Update the newly generated canvas with the canvas coordinates.
    this.timedUpdate = setTimeout(()=>{
      const canvas = this.refs.canvas,
      ctx=canvas.getContext("2d")
      this.state.canvasData.map((ele)=>{
        ctx.fillStyle = ele[ele.length-1]
        ele = ele.slice(0,4)
        console.log(ele);
        return ctx.fillRect(...ele)
      })
    }, 200)
  }
  renderBoxes = () => {
    var component = this.refs.canvas
    var ctx = component.getContext()
    console.log(ctx);
    const boxes = this.state.canvasData.map((element, index) => {
      console.log(element);
      let x = element[0]/100
      let y = element[1]/100
      let z = -3

      // Note width in this view can be disregarded
      let width = '.01px'
      let height = element[2]/100 || '.1px'
      let depth = element[3]/100 || '.1px'
      let color = element[4]
      return (
        <a-box
          key={index}
          position={`${x} ${y} ${z}`}
          rotation="0 90 0"
          color={`${color}`}
          width={`${width}`}
          height={`${height}`}
          depth={`${depth}`}
          >
          </a-box>
        )
    })
    return boxes
  }
  _canvasFill(x, y) {
    const canvas = this.refs.canvas,
          canvasBounds = canvas.getBoundingClientRect(),
          ctx=canvas.getContext("2d")
    console.log(this.state.selected_color, x, y);
    ctx.fillStyle= 'blue'
    ctx.fillRect(x,y,this.state.rectangle_width,this.state.rectangle_height)
  }
  handleClick(e){
    console.log(e.target, e.clientX, e.clientY, e.button);
  }
  render() {
    return(
      <div style={{backgroundColor: 'white'}} onMouseDown={this.handleClick} >
      <a-scene>
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
        <a-sky color="white"></a-sky>
      </a-scene>
      </div>

    )
  }
}
