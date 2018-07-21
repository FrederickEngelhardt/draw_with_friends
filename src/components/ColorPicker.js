import React from 'react';
import { SketchPicker, CirclePicker } from 'react-color';
import '../css/ColorPicker.css'
export default class ColorPicker extends React.Component {

  render() {
    return (
      <div style={{backgroundColor: 'red'}} className="colorPicker">
        <CirclePicker />
      </div>
    )
  }
}
