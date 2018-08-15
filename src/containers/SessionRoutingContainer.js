import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActionCreators from '../actions/user';

import Routing from '../components/Routing'
class SessionRoutingContainer extends Component {
  render(){
    const { dispatch, user } = this.props;
    const toggleDrawingTools = bindActionCreators(UserActionCreators.addSession, dispatch);
    return(
      <Routing sessions={user.sessions}/>
    )
  }
}

const mapStateToProps = state => (
  {
    user: state
  }
);
export default connect(mapStateToProps)(SessionRoutingContainer);
