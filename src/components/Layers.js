import React, { Component } from 'react';
import '../css/Layers.css'

export default class Layers extends Component {
  constructor(props){
    super(props)
    this.state = {
      mouseDown: false,
      x: 0,
      y: 0,
      mouseX: null,
      mouseY: null,
      layers: [],
      value: '',
    }
    this.props.socket.on('update_layers', (data) => {
        console.log([...this.state.layers, data]);
        this.setState({layers: [...this.state.layers, data]})
    })
    this.props.socket.on('load_layers', (data) => {
      console.log(data);
      let values = data.map((e) => {
        return [e.canvas, e.name]
      })

      this.setState({layers: values})
    })
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  _onDragDiv(e){
    // const {mouseX, mouseY, x, y} = this.state
    // if (this.state.mouseDown === false) return
    // if (this.state.mouseX === null) {
    //   this.setState({mouseX: e.clientX, mouseY: e.clientY})
    // }
    // console.log(mouseX, mouseY, this.state.x, this.state.y);
    // const offsetX = e.clientX - mouseX
    // const offsetY = e.clientY - mouseY
    // console.log(offsetX, offsetY);
    // this.setState({x: x+offsetX, y: y+offsetY})
  }
  generateLayers() {
    return(
      this.state.layers.map((ele,index) => {
        /*
          ele[0] is layer data
          ele[1] is layer name
        */
        return (
          <div key={index} id={ele[1]}>
            <input className="orderBox" placeholder={index} />
            {ele[1]}
            </div>)
      })
    )
  }
  createLayer(){
    return (
      <form onSubmit={this.handleSubmit}>
        <button>Add Layer
      </button>
      <input
        className="inputBox"
        type="text"
        value={this.state.value}
        onChange={this.handleChange}
        onClick={this.preventDrag}
        placeholder={'Layer Name'}
        />
      </form>
    )
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event){
    event.preventDefault()
    this.props.socket.emit('add_layer', {name: this.state.value})
  }
  render(){
    return (
      <div
        onMouseLeave={() => this.state.mouseDown ? this.setState({mouseDown: false}) : 0}
        onMouseMove={(e) => this._onDragDiv(e)}
        onMouseDown={()=>this.setState({mouseDown: !this.state.mouseDown})}
        style={{left: this.state.x, top: this.state.y}}
        draggable={true}
        className="resizable">
        {this.createLayer()}
        {this.generateLayers()}
      </div>
   )
  }
}
