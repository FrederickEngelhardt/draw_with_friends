import React, { Component } from 'react';
import '../css/Sketch.css'
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001')

socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});
let color = 'blue'
export default class Sketch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: 'white'
    }
    socket.on('update_color', (payload) => {
      console.log(payload);
      this.setState({color: payload})
    })
  }
  componentDidMount(){
    // socket.emit('connect', ()=>{
    //   console.log('new connection')
    // })
    // socket.emit('getColor', ()=>{
    //   console.log('requesting for current set colors')
    // })
  }
  componentWillUnmount() {
    socket.emit('disconnect', {
      room: this.props.challenge.id
    })
  }
  render() {
    return (
      <div style={{backgroundColor: this.state.color}} className="Sketch" onClick={() =>{
        if(this.state.color === 'white'){
          console.log('true');
          color = 'blue'
          socket.emit('change_color', 'red')
        }
        else if(this.state.color === 'red'){
          console.log(this.state.color);
          console.log('else called');
          color = 'blue'
          socket.emit('change_color', 'white')
        }
      }
      }>
      </div>)
  }
}
