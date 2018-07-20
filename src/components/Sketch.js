import React, { Component } from 'react';
import '../css/Sketch.css'
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001')

socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});

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
        console.log('test')
        let color = this.state.color
        console.log('THSI SI COLOR', color);
        if(this.state.color === 'blue'){
          console.log('true');
          color = 'white'
          socket.emit('color', color)
        }
        else{
          socket.emit('color', color)
        }
      }
      }>
      </div>)
  }
}
