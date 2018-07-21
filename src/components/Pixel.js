import React, { Component } from 'react';
import '../css/Pixel.css'

let color = 'blue'
export default class Pixel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: this.props.color || 'red',
      pixel_id: this.props.id,
      mouseDown: false,
    }
    this.props.socket.on(`update_color${this.state.pixel_id}`, (payload) => {
      if (payload.id === this.state.pixel_id){
        let {color} = payload.color
        console.log('updated color because it matched!');
        this.setState({color: color})
      }
      else {
        console.log(payload.id, this.state.pixel_id);
      }
    })
  }
  componentDidMount(){

  }
  componentWillUpdate(){
  }
  changeColor(){
    // if (this.state.mouseDown === false) return
    // Call SketchBox function
    this.props.changeColor(this.state.pixel_id, 'red')
  }
  render() {
    return (
      <div style={{backgroundColor: this.state.color}} className={`Pixel box${this.state.pixel_id}`}
        onMouseDown={()=>{
          this.setState({mouseDown: true})
          this.changeColor()
        }}
        // onMouseUp={()=>{this.setState({mouseDown: true})}}
        // onMouseEnter={this.changeColor.bind(this)}
      >
      </div>)
  }
}
// style={{backgroundColor: this.state.color}}
