import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import LogoutButton from '../logout/logout';

import './header.scss';
const LinksNoAuth = () => (
  <div className='options'>
    <Link className='option' to='/'>
      INDEX
      </Link>
    <Link className='option' to='/shop'>
      SHOP
      </Link>
    <Link className='option' to='/signin'>
      LOGIN/REGISTER
      </Link>
  </div>
);

const LinksWithAuth = ({ loggedUser }) => (
  <div className='options'>
    welcome {loggedUser.name}
    <Link className='option' to='/'>
      INDEX
      </Link>
    <Link className='option' to='/shop'>
      SHOP
      </Link>
    <LogoutButton />
  </div>
);

const Header = ({ session }) => (
  <div className='header'>
    {session && session.loggedUser ? <LinksWithAuth loggedUser={session.loggedUser} /> : <LinksNoAuth />}
  </div>
);

export default withRouter(Header);