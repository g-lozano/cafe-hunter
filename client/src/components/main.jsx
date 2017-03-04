
import { getUser, getClicks } from '../reducer';
import { Link } from 'react-router';

import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import Search from './search.jsx';

const Main = ({ click, reset, clicks, user }) => {
  var userinfo = []
  
  if (user.username != 'guest') {
    userinfo = (
      <div>
        <Link className="menu" to="/profile">Profile</Link>
        <p>|</p>
        <a className="menu" href="/logout">Logout</a>
      </div>
      )
  }
  else
    userinfo = <a className="menu" href="auth/twitter">Login</a>
  
  return (
    <div>
      <header>
        <div className="main-title">Cafe Hunter</div>
        <p>Welcome, <span id="display-name">{user.username}</span>!</p>
        {userinfo}
      </header>
      <br/><br/><br/><br/><br/><br/><br/><br/>
      <Search user={user}/>
      <br/><br/><br/>
    </div>
  );
}

Main.propTypes = {
  click: React.PropTypes.func.isRequired,
  reset: React.PropTypes.func.isRequired,
  clicks: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number]).isRequired,
  user: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: getUser(state),
    clicks: getClicks(state),
  };
}

export const MainComponent = Main;
export const MainContainer = connect(mapStateToProps, actionCreators)(Main);
