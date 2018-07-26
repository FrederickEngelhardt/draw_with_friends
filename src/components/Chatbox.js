import React, { Component } from 'react';
import {Launcher} from 'react-chat-window'
export default class Chatbox extends Component {
  constructor(props){
    super(props)
    this.state = {
      socket: this.props.socket,
      messageList: [{author: "me", data: {text: 'test'}}],
    }
    this.state.socket.on('update_messages', (data)=>{
      data = [...data].length > 1 ? data : [data]
      return data.map((ele)=>{
        return this.setState({
          messageList: [...this.state.messageList, ele]
        })
      })
    })
  }
  _onMessageWasSent(message) {
    this.state.socket.emit('user_message_sent', message)
  }
  _sendMessage(text) {
  if (text.length > 0) {
    this.setState({
      messageList: [...this.state.messageList, {
        author: 'them',
        type: 'text',
        data: { text }
      }]
    })

  }
}
  render(){
    return(
      <div>
      <Launcher
        agentProfile={{
          teamName: 'Draw-With-Friends!',
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
