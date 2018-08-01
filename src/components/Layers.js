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
      value: 'new layer',
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
            <Button id={index} color="primary">&#8593;</Button>
            <Button id={index} color="primary">&darr;</Button>
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
          className="col-4">{`Add Layer`}
        </div>
        <input className="col-4" placeholder="Name"></input>
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
    this.props.socket.emit('add_layer', {name: this.state.value})
  }
  swap_layer(){
    const change_layer = (event) => {
      event.preventDefault()
      if (this.state.change_id === null) return
      this.props.socket.emit('swap_layer', {
        from_id: this.state.change_id[0],
        to_id: this.state.change_id[1]
      })
    }
    return (
      <form onSubmit={change_layer}>
        <button>Change Layer
        </button>
      </form>
    )
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
// <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
// <ListGroupItem>Morbi leo risus</ListGroupItem>
// <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
// <ListGroupItem>Vestibulum at eros</ListGroupItem>

// <ButtonGroup vertical>
//   <Button>1</Button>
//   <Button>2</Button>
//   <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
//     <DropdownToggle caret>
//       Dropdown
//     </DropdownToggle>
//     <DropdownMenu>
//       <DropdownItem>Dropdown Link</DropdownItem>
//       <DropdownItem>Dropdown Link</DropdownItem>
//     </DropdownMenu>
//   </ButtonDropdown>
// </ButtonGroup>
