import React, { Component } from 'react';
import { withRouter } from "react-router-dom";



class NewSessionCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      form: false,
    }
  }
  openMenu(){
    this.setState({form: true})
  }
    handleSubmit(event){
    event.preventDefault()
    let i = withRouter(({ history }) => {
      history.push('/drawing')
      console.log(history);

    })
    console.log('called handleSubmit', i);
  }
  renderForm = () => {
    if (this.state.form === true){
      return (
        <form className={`new-session-form`} onSubmit={(event)=>{
            event.preventDefault()
            console.log(event.target[0].value);
            let id = (event.target[0].value).toString()
            console.log("THIS IS ID EMITTED", id);
            this.props.sessions.emit('add_session', id)
            this.props.updateSelectedSession(id)
            this.props.history.push(`/drawing/${id}`)
          }}>
          <input type="text" name="name"/>
          <input type="submit" value="Get Drawing" />
        </form>
      )
    }
    else {
      return(
        <img className="big-button__icon" src={require('../../assets/icons/add.svg')} alt="You can add?" />
      )
    }
  }
  render(){
    return (
      <div className={``}>
        <div className={`${this.state.form ? '' : 'clickAnimation'}  DrawingPageCard`} onClick={this.openMenu.bind(this)}>
          <div>
            <div className="green big-button">
            <div className="big-button__title">
            Add a Session
            </div>
            {this.renderForm()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(NewSessionCard)
