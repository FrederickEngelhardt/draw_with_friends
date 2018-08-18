import React, { Component } from 'react';
import { withRouter } from "react-router-dom";



class JoinSessionCard extends Component {
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
            const { sessionList } = this.props
            let id = (event.target[0].value).toString()
            const isRoute = sessionList.filter((element) => {
              return id === element
            })
            if (isRoute.length >= 1) {
              this.props.history.push(`/drawing/${id}`)
            }
          }}>
          <h4 className={`DescriptionTitle`}>
            Join a Session!
          </h4>
          <input type="text" name="name"/>
          <input type="submit" value="Join" />
        </form>
      )
    }
    else {
      return(
        <h1 className={`clickAnimation buttonTitle extra-large-font`}> <img
          className={`card-icon`} src={require('../../assets/icons/networking.svg')} alt="peer-connect" /> </h1>
      )
    }
  }
  render(){
    return (
      <div className={``}>
        <div className={`${this.state.form ? '' : 'clickAnimation'} shadow Button orange DrawingPageCard`} onClick={this.openMenu.bind(this)}>
          {this.renderForm()}
        </div>
      </div>
    )
  }
}
export default withRouter(JoinSessionCard)

// Networking icon made by https://www.flaticon.com/authors/gregor-cresnar
