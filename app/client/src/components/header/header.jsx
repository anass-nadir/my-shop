import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import LogoutButton from '../logout/logout';
import CartIcon from '../cartIcon/cartIcon';
import CartDropdown from '../cartDropdown/cartDropdown';

import './header.scss';
const LinksNoAuth = ({ hidden }) => (
  <div className='options'>
    <Link className='option' to='/'>
      INDEX
    </Link>
    <Link className='option' to='/shop'>
      SHOP
    </Link>
    <CartIcon />
    {hidden ? null : <CartDropdown />}
    <Link className='option' to='/signin'>
      LOGIN/REGISTER
    </Link>
  </div>
);

const LinksWithAuth = ({ loggedUser, hidden }) => (
  <div className='options'>
    welcome {loggedUser.name}
    <Link className='option' to='/'>
      INDEX
    </Link>
    <Link className='option' to='/shop'>
      SHOP
    </Link>
    <CartIcon />
    {hidden ? null : <CartDropdown />}
    <LogoutButton />
  </div>
);

const Header = ({ currentUser, hidden }) => (
  <div className='header'>
    {currentUser ? (
      <LinksWithAuth hidden={hidden} loggedUser={currentUser} />
    ) : (
      <LinksNoAuth hidden={hidden} />
    )}
  </div>
);

const mapStateToProps = ({ user, cart }) => {
  return {
    currentUser: user.currentUser,
    hidden: cart.hidden
  };
};
export default connect(mapStateToProps)(withRouter(Header));
