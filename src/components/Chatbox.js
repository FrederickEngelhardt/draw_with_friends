import React, { Component } from 'react';
import {Launcher} from 'react-chat-window'
import openSocket from 'socket.io-client';
export default class Chatbox extends Component {
  constructor(props){
    super(props)
    this.state = {
      messageList: [{author: "me", data: {text: 'test'}}],
      sent: true,
    }
    this.props.socket.on('update_messages', (data)=>{
      // console.log("Messages were updated!");
      data = [...data].length > 1 ? data : [data]
      return data.map((ele)=>{
        if (this.state.sent === true){ele.author = 'me'; this.setState({sent: false})}
        return this.setState({
          messageList: [...this.state.messageList, ele]
        })
      })
    })
  }
  _onMessageWasSent(message) {
    this.setState({sent: true})
    message.author = 'them'
    // console.log('CALLED', message);
    this.props.socket.emit('user_message_sent', message)
  }
  render(){
    return(
      <div>
      <Launcher
        agentProfile={{
          teamName: 'All Drawing Friends!',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        showEmoji
      />
      </div>
    )
  }
}
