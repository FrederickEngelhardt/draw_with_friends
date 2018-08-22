import React, { Component } from 'react';
import '../css/Canvas.css'


const defaultColors = [
  '#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00','#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'
]

export default class Canvas extends Component {
  // static propTypes = {
  //   user: PropTypes.object.isRequired
  // };
  constructor(props){
    super(props)
    this.state = {
      x: undefined,
      y: undefined,
      rectangle_width: this.props.state.brush_width,
      rectangle_height: this.props.state.brush_height,
      keyboard_x: 0,
      keyboard_y: 50,
      canvasWidth: null,
      canvasHeight: null,
      canvasData: [],
      alpha: 0.2,
      color_memory: defaultColors,
      selected_color: 'rgba(118,0,255,0.2)',
      clickDown: false
    }

    this.props.socket.on('update_session_canvas', (data) => {
      const canvas = this.refs.canvas,
            ctx=canvas.getContext("2d");

      ctx.fillStyle = data[data.length-1]
      data = data.slice(0,4)

      // Update user canvasData
      this.setState({canvasData: [...this.state.canvasData, data]})

      return ctx.fillRect(...data)
    })
    this.props.socket.on('load_canvas', (data) => {
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
    document.addEventListener("keydown", this.onKeyPressed.bind(this))
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
    return true
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

  _onMouseMove(e) {
    e.preventDefault()
    // Detects the current coordinates of the mouse and draws
    const canvas = this.refs.canvas,
          canvasBounds = canvas.getBoundingClientRect(),
          ctx=canvas.getContext("2d"),
          offsetLeft = canvasBounds.left,
          offsetTop = canvasBounds.top
    const { rectangle_width, rectangle_height} = this.state

    // Do not need to change state to draw.
    const x = e.clientX-offsetLeft - rectangle_width/2,
          y = e.clientY - offsetTop - rectangle_height/2
    this._canvasFill(x, y)
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
    const x = e.touches[0].clientX-offsetLeft - rectangle_width/2,
          y = e.touches[0].clientY - offsetTop - rectangle_height/2
    this._canvasFill(x, y)
  }
  _canvasFill(x, y) {
    const canvas = this.refs.canvas,
          canvasBounds = canvas.getBoundingClientRect(),
          ctx=canvas.getContext("2d")
    console.log(this.state.selected_color, x, y);
    ctx.fillStyle= this.state.selected_color
    ctx.fillRect(x,y,this.state.rectangle_width,this.state.rectangle_height)

    this.props.socket.emit('update_canvas', [x,y, this.state.rectangle_width,this.state.rectangle_height,this.state.selected_color])
  }

  _clearCanvas() {
    this.refs.canvas.getContext("2d").clearRect(0, 0, this.state.canvasWidth, this.state.canvasHeight)
  }



  checkIfMousePress = () => {
    if (this.state.clickDown === true) this.setState({clickDown: false})
  }
  cursorStyle() {
    return {cursor: `url('data:image/svg+xml;utf8,<svg width="${50 + this.state.rectangle_width/2}" height="${50 + this.state.rectangle_height/2}" viewBox="0 0 600 600" version="1" xmlns="http://www.w3.org/2000/svg"><g id="Page-1" fill="none" fill-rule="evenodd"><g id="paint-brush-svgrepo-com" transform="scale(${this.state.clickDown ? .8 : 1} -1) rotate(-45 -279 -100)"><path id="Rectangle-2" fill="${this.state.selected_color}" d="M24 11h179v79H24z"/><path id="Rectangle-4" fill="#FFF" d="M38 101h151v27H38z"/><path d="M139 246H87v18c-9 22-16 54-16 82 0 50 19 73 42 73 24 0 43-23 43-73 0-28-7-60-17-82v-18zM217 82V9c0-5-4-9-9-9H19c-5 0-9 4-9 9v73H0v100c0 28 23 52 52 52h123c29 0 52-24 52-52V82h-10zm-30 43H40v-22h147v22zm12-43H28V18h37l4 24a3 3 0 0 0 5 0l5-24h13l4 24a3 3 0 0 0 6 0l4-24h56l5 32a3 3 0 0 0 6 0l5-32h21v64z" id="Shape" fill="#000" fill-rule="nonzero"/></g></g></svg>') 0 32, pointer`}
  }
  onKeyPressed = (event) => {
    console.log(event.key);
    if (!event.key.includes("Arrow")) return
    const { rectangle_width, rectangle_height } = this.state
    switch (event.key) {
      case "ArrowRight":
        if (this.state.canvasWidth < (this.state.keyboard_x+rectangle_width)) return
        this.setState({keyboard_x: this.state.keyboard_x+rectangle_width})
        break;
      case "ArrowLeft":
        if (0 > (this.state.keyboard_x - rectangle_width)) return
        this.setState({keyboard_x: this.state.keyboard_x-rectangle_width})
        break;
      case "ArrowDown":
        if (this.state.canvasHeight+rectangle_height < (this.state.keyboard_y)) return
        this.setState({keyboard_y: this.state.keyboard_y+rectangle_height})
        break;
      case "ArrowUp":
        if (50 < (this.statekeyboard_y-rectangle_height)) return
        this.setState({keyboard_y: this.state.keyboard_y-rectangle_height})
        break;
    }
    this._canvasFill(this.state.keyboard_x,this.state.keyboard_y)
  }
  render() {
    return(
      <div onKeyPress={this.onKeyPressed}
        tabIndex="0" className="canvas_container">
        <canvas
          style={this.cursorStyle()}
          className="canvas"
          height={this.state.canvasHeight}
          width={this.state.canvasWidth}
          onMouseDown={() => this.setState({clickDown: true})}
          onTouchStart={() => this.setState({clickDown: true})}
          onMouseMove={this.state.clickDown === true ? this._onMouseMove.bind(this) : ()=>{return false}}
          onMouseUp={()=>{
            this.setState({clickDown: false})
          }}
          ref="canvas"/>
      </div>
    )
  }
}
