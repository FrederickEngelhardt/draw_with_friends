import React, { Component, PropTypes } from 'react';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActionCreators from './actions/user';

// Stylesheets
import './App.css';

import Canvas from './containers/Canvas'
import Layers from './components/Layers'



class App extends Component {
  render() {
    const { dispatch, user } = this.props;
    console.log(this.props.user, "PROPS");
    const changeColor = bindActionCreators(UserActionCreators.changeColor, dispatch);
    console.log(user, changeColor);
    return (
      <div className="App">
        <Canvas state={user} changeColor={changeColor}/>
        <Layers />
      </div>
    );
  }
}
const mapStateToProps = state => (
  {
    user: state
  }
);
export default connect(mapStateToProps)(App);
