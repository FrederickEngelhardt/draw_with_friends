import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActionCreators from '../actions/user';

import Routing from '../components/Routing'
class SessionRoutingContainer extends Component {
  render(){
    const { dispatch, user } = this.props;
    const { sessionList, sessions } = user
    const addSession = bindActionCreators(UserActionCreators.addSession, dispatch);
    return(
      <Routing
      sessions={sessions}
      sessionList={sessionList}
      addSession={addSession}
      />
    )
  }
}

const mapStateToProps = state => (
  {
    user: state
  }
);
export default connect(mapStateToProps)(SessionRoutingContainer);
