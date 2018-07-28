import React, { Component } from 'react';
import '../css/Layers.css'

export default class Layers extends Component {
  state = {
    mouseDown: false,
    x: 50,
    y: 50,
  }
  _onDragDiv(e){
    if (this.state.mouseDown === false) return
    console.log(e);
    this.setState({x: e.clientX, y: e.clientY})
  }

  render(){
    // onMouseUp={() => this.setState({mouseDown: false})}
    return (
      <div
        onMouseLeave={() => this.state.mouseDown ? this.setState({mouseDown: false}) : 0}
        onMouseMove={(e) => this._onDragDiv(e)}
        onMouseDown={()=>this.setState({mouseDown: !this.state.mouseDown})}
        style={{left: this.state.x-100, top: this.state.y-100}}
        draggable={true}
        className="resizable">
        <ul></ul>
      </div>
   )
  }
}
