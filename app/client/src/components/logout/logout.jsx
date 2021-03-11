import React from 'react';
import { connect } from 'react-redux';

import { logoutUser } from '../../redux/user/actions';

const LogoutButton = ({ dispatch }) => {
  const logout = () => {
    dispatch(logoutUser());
  };
  return (
    <button className='option' onClick={logout}>
      LOGOUT
    </button>
  );
};

export default connect()(LogoutButton);
