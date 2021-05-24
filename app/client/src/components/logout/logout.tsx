import React from 'react';
import { useAppDispatch } from '../../redux/hooks';

import { logoutUser } from '../../redux/user/thunks';

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  return (
    <button className='option' onClick={() => dispatch(logoutUser())}>
      LOGOUT
    </button>
  );
};

export default LogoutButton;
