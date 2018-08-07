import React, { Component } from 'react';
import {
  Button,
  Badge,
  ButtonGroup,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ListGroup,
  ListGroupItem,
  } from 'reactstrap';
import '../css/Layers.css'

export default class Layers extends Component {
  constructor(props){
    super(props)
    this.state = {
      mouseDown: false,
      x: 0,
      y: 90,
      mouseX: null,
      mouseY: null,
      layers: this.props.layers || [1,2,5, 7],
      value: 'L1',
      change_id: null,
      active: this.props.layersActive || false,
    }
    this.props.socket.on('update_layers', (data) => {
        console.log([data,...this.state.layers]);
        this.setState({layers: [...this.state.layers, data]})
    })
    this.props.socket.on('load_layers', (data) => {
      data = data.slice(0, data.length-1)
      console.log(data);
      const values = data.map((e, index) => {
        return [e.canvas, e.name, index]
      })

      this.setState({layers: values})
    })
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidUpdate() {
    console.log('COMPONENT WILL RECEIVE PROPS', this.props);
    const {layersActive} = this.props
    if (this.state.active !== layersActive){
      this.setState({
        active: layersActive
      })
    }
    return true
  }
  generateLayers() {

    const generate = this.state.layers.map((ele,index) => {
        /*
          ele[0] is layer data
          ele[1] is layer name
        */
        return (
          <ListGroupItem className="d-flex justify-content-between">{ele[1]}
          <ButtonGroup className="d-flex justify-content-end">
            <Button onClick={this.swap_layer} id={`${index} UP`} color="primary">&#8593;</Button>
            <Button onClick={this.swap_layer} id={`${index} DOWN`} color="primary">&darr;</Button>
            <Button onClick={this.deleteLayer} id={index} color="danger">X</Button>
          </ButtonGroup>
          </ListGroupItem>
          )
      })
    return generate
  }
  layerCreateForm(){
    return (
      <form className="row" onSubmit={this.handleSubmit}>
        <div
          className="layer-text col-4">{`Add Layer`}
        </div>
        <input onChange={this.handleChange} value={this.state.value} className="col-4" placeholder="Name"></input>
        <div className="col-4">
          <Button color="success">+</Button>
        </div>
      </form>
    )
  }
  handleChange(event) {
    event.preventDefault()
    this.setState({value: event.target.value});
  }
  handleSwapChange = (event) => {
    console.log(event.target.placeholder, event.target.value);
    let array = [event.target.placeholder, event.target.value]
    this.setState({change_id: array})
  }
  handleSubmit(event){
    event.preventDefault()
    console.log(event.target);
    this.setState({value: ''})
    this.props.socket.emit('add_layer', {name: this.state.value})
  }
  swap_layer = (event) => {
    console.log(event.target);
    const { id } = event.target,
            id_num = id.split(" ")[0],
            direction = id.split(" ")[1]

    if (typeof parseInt(id_num) !== "number"){
      return false
    }
    if (typeof direction !== "string"){
      return false
    }
    console.log('emmited swap_layer');
    this.props.socket.emit('swap_layer', {id: id_num, direction: direction})
  }
  deleteLayer = (event) => {
    if (event.target.id >= 0){
      console.log(this.props);
      this.props.socket.emit('delete_layer', {id: event.target.id})
    }
    else {
      console.log('ERROR somehow id was not in range');
    }
  }
  checkActive(){
    if (this.state.active === 'LAYER_MENU'){
      return {display: 'block'}
    }
    else {
      return {display: 'none'}
    }
  }
  render(){
    return (
      <ListGroup style={this.checkActive()}>
        {this.layerCreateForm()}
        <div>
          {this.generateLayers()}
        </div>
      </ListGroup>
   )
  }
}
