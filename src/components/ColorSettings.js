import React, { Component } from 'react'
import { AlphaPicker, HuePicker, CompactPicker } from 'react-color';
/*
  This component will change redux state colors
*/
export default class ColorSettings extends Component {
  state = {
    alpha: 1,
  }
  _handleChangeSavedColor = (color, event) => {
    let {r,g,b,a} = color.rgb
    color = `rgba(${r},${g},${b},${a})`
    this.props.changeColor(color)
  }
  _handleChangeCompleteAlpha = (color, event) => {
    // Locate RGBA in color and reformat
    let {r,g,b,a} = color.rgb
    color = `rgba(${r},${g},${b},${a})`
    this.setState({alpha: a})
    this.props.changeColor(color)
  }
  _handleChangeComplete = (color, event) => {
    let { r,g,b,a } = color.rgb
    // Replace default color alpha with state alpha
    a = this.state.alpha
    let { color_memory } = this.props.state
    let { changeColor } = this.props
    color_memory = color_memory.slice(0,color_memory.length - 1)
    color_memory.unshift(`rgba(${r},${g},${b},${a})`)
    color = `rgba(${r},${g},${b},${a})`
    changeColor(color)
    this.setState({
      selected_color: color,
      color_memory: color_memory  })
    console.log("REDUX STATE", this.props.state);
  }
  render(){
    return(
      <div className="colorPicker">
        <HuePicker
          color={this.props.selected_color}
          onChangeComplete={this._handleChangeComplete} />
        <AlphaPicker
          color={this.props.selected_color}
          onChangeComplete={ this._handleChangeCompleteAlpha } />
        <CompactPicker
          colors={this.props.color_memory}
          onChangeComplete= { this._handleChangeSavedColor}
          onSwatchHover={(color, event)=>{}}
          />
      </div>
    )
  }
}
