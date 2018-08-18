import React, { Component } from 'react'
import { Button } from 'reactstrap';

export default class SettingsNav extends Component {
  render(){
    const { settingSelector } = this.props
    return (
      <div className="container">
        <div className="row">
        <Button
            onClick={() => settingSelector('COLOR_MENU')}
            className=".col-"
            color="primary"
            size=".5g"
            active
          >Colors
        </Button>
        <Button
          onClick={() => settingSelector('LAYER_MENU')}
          className=".col-"
          color="secondary"
          size=".5g"
          active>Layers
        </Button>
        <Button
          onClick={()=>{this.props.socket.emit('clear_canvas', {})}}
          className=".col-"
          color="danger"
          size=".5g"
          active>Reset
        </Button>
        </div>
      </div>
    )
  }
}
