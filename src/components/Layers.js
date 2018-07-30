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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  _onDragDiv(e){
    const {mouseX, mouseY, x, y} = this.state
    if (this.state.mouseDown === false) return
    if (this.state.mouseX === null) {
      this.setState({mouseX: e.clientX, mouseY: e.clientY})
    }
    console.log(mouseX, mouseY, this.state.x, this.state.y);
    const offsetX = e.clientX - mouseX
    const offsetY = e.clientY - mouseY
    console.log(offsetX, offsetY);

    // if (mouseX !== null && mouseY !== null) return
    // else {
      this.setState({x: x+offsetX, y: y+offsetY})
    // }
  }
  generateLayers() {
    return(
      this.state.layers.map((ele,index) => {
        return <div key={index} id={ele}><input />{ele}</div>
      })
    )
  }
  createLayer(){
    return (
      <form onSubmit={this.handleSubmit}>
        <button>Add Layer
      </button>
      <input
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
        this.setState({layers: [...this.state.layers, this.state.value]})
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
