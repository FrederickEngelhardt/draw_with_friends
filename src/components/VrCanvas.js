import React, { Component } from 'react';
import '../css/Canvas.css'
import 'aframe'

const defaultColors = [
  '#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00','#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'
]

export default class VrCanvas extends Component {
  constructor(props){
    super(props)
    this.state = {
      canvasData: [],
      socket: this.props.socket,
    }

    this.state.socket.on('update_session_canvas', (data) => {
        const { canvasData } = this.state
        console.log(data);
        const update = [...canvasData, data]
        this.setState({canvasData: update})
      })
    this.state.socket.on('load_canvas', (data) => {
      this.setState({canvasData: data})
    })
  }
  renderBoxes = () => {
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
  render() {
    return(
      <a-scene>
      {this.renderBoxes()}
        <a-sky color="blue"></a-sky>
      </a-scene>
    )
  }
}
