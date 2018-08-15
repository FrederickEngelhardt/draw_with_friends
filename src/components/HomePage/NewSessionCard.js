import React, { Component } from 'react';
import { withRouter } from "react-router-dom";



export default class NewSessionCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      form: true,
    }
  }
  openMenu(){
    this.setState({form: true})
  }
  handleSubmit(event){
    event.preventDefault()
  }
  renderForm(){
    if (this.state.form === true){
      return (
        <form className={`new-session-form`} onSubmit={this.handleSubmit.bind(this)}>
          <h4 className={`buttonTitle`}>
            Add a name to make your session standout!
          </h4>
          <input type="text" name="name" />
          <input type="submit" value="Submit" />
        </form>
      )
    }
    else {
      return(
        <h1 className={`clickAnimation buttonTitle extra-large-font`}> + </h1>
      )
    }
  }
  render(){
    return (
      <div className={`DrawingPageCard`}>
      <button className={`shadow Button green DrawingPageCard`} onClick={this.openMenu.bind(this)}>
        {this.renderForm()}
      </button>
      </div>
    )
  }
}
const Button = withRouter(({ history }) => (
  <button
    type='button'
    onClick={() => { history.push('/drawing') }}
  >
    Click Me!
  </button>
))
