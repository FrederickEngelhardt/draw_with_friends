import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActionCreators from '../actions/user';


// Stylesheets
import '../css/App.css'
import '../css/HomePage.css'

import NavigationContainer from './NavigationContainer'
import NewSessionCard from '../components/HomePage/NewSessionCard'
import JoinSessionCard from '../components/HomePage/JoinSessionCard'
import RecentSessionCard from '../components/HomePage/RecentSessionCard'

class HomePageContainer extends Component {
  render() {
    const { dispatch, user } = this.props;
    const { sessions, sessionList } = user
    const updateSelectedSocketSession = bindActionCreators(UserActionCreators.updateSelectedSocketSession, dispatch);
    return (
      <div className="App">
        <NavigationContainer view={`home-view`}/>
        <div className={`click home-flex`}>
          <NewSessionCard
          sessions={sessions}
          updateSelectedSocketSession={updateSelectedSocketSession}
          />
        <JoinSessionCard sessionList={sessionList}/>
          {/*<RecentSessionCard />*/}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => (
  {
    user: state
  }
);
export default connect(mapStateToProps)(HomePageContainer);
