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
    let i = withRouter(({ history }) => {
      history.push('/drawing')
      console.log(history);

    })
    console.log('called handleSubmit', i);
  }
  renderForm(){
    if (this.state.form === true){
      return <Form />
    }
    else {
      return(
        <h1 className={`clickAnimation buttonTitle extra-large-font`}> + </h1>
      )
    }
  }
  render(){
    return (
      <div className={``}>
        <button className={`shadow Button green DrawingPageCard`} onClick={this.openMenu.bind(this)}>
          {this.renderForm()}
        </button>
      </div>
    )
  }
}
const Form = withRouter(({ history }) => (
  <form className={`new-session-form`} onSubmit={(event)=>{
      event.preventDefault()
      console.log(event.target[0].value);
      let id = event.target[0].value
      history.push(`/drawing/${id}`)
    }}>
    <h4 className={`buttonTitle`}>
      Name Your Session!
    </h4>
    <input type="text" name="name"/>
    <input type="submit" value="Get Started" />
  </form>
))
