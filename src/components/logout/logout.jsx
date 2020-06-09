import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutUser } from '../../redux/user/actions';


const LogoutButton = props => {
  const logout = async () => {
    localStorage.removeItem('token');
    await props.dispatch(logoutUser())
    props.history.push('/signin');
  }
  return (
    <button className="option" onClick={logout}>LOGOUT</button>
  );
}

export default connect()(withRouter(LogoutButton));