import React, { Component } from 'react';
import '../css/Pixel.css'

let color = 'blue'
export default class Pixel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: this.props.color || 'red',
      pixel_id: this.props.id,
    }
    /*
      NOTE: We are taking socket from Sketchs and using it.
    */
    this.props.socket.on('update_color', (payload) => {
      console.log(payload, 'update color called');
      if (payload.id === this.state.pixel_id){
        console.log('updated color because it matched!');
        this.setState({color: payload.color})
      }
      else {
        console.log(payload.id, this.state.pixel_id);
      }
    })
  }
  changeColor(){
    // Call SketchBox function
    this.props.changeColor(this.state.pixel_id, this.state.color)
  }
  render() {
    return (
      <div style={{backgroundColor: this.state.color}} className="Pixel"
        onClick={()=>{this.changeColor()}}>
      </div>)
  }
}
// style={{backgroundColor: this.state.color}}
