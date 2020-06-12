import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutUser } from '../../redux/user/actions';


const LogoutButton = ({ dispatch, history }) => {
  const logout = async () => {
    await dispatch(logoutUser(() => localStorage.removeItem('token')))
    history.push('/signin');
  }
  return (
    <button className="option" onClick={logout}>LOGOUT</button>
  );
}

export default connect()(withRouter(LogoutButton));