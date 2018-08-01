import React, { Component } from 'react'
import { AlphaPicker, HuePicker, CompactPicker } from 'react-color';
/*
  This component will change redux state colors
*/
import '../css/ColorSettings.css'

export default class ColorSettings extends Component {
  state = {
    alpha: 1,
    active: this.props.colorActive || false,
    brush_height: this.props.brush_height,
  }
  componentDidUpdate() {
    const {colorActive} = this.props
    if (this.state.active !== colorActive){
      this.setState({
        active: colorActive
      })
    }
    return true
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
  checkActive(){
    if (this.state.active === 'COLOR_MENU'){
      return {display: 'block'}
    }
    else {
      return {display: 'none'}
    }
  }
  brushSizeSliderChange = (event) => {
    let { value } = event.target
    value = parseInt(value)
    this.setState({brush_height: value})
    this.props.changeBrushSize(value, value)
  }
  render(){
    return(
      <div style={this.checkActive()} className="ColorSettings row">
        <HuePicker
          width={'100%'}
          color={this.props.selected_color}
          onChangeComplete={this._handleChangeComplete} />
        <AlphaPicker
          width={'100%'}
          color={this.props.selected_color}
          onChangeComplete={ this._handleChangeCompleteAlpha } />
        <CompactPicker
          colors={this.props.color_memory}
          onChangeComplete= { this._handleChangeSavedColor}
          onSwatchHover={(color, event)=>{}}
          />
        <div className="slidecontainer">
          <input onChange={this.brushSizeSliderChange} type="range" min="10" max="140" value={this.state.brush_height} className="slider" id="myRange"></input>
        </div>
      </div>
    )
  }
}
