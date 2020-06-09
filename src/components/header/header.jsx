import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartHidden } from '../../redux/cart/selectors';
import { selectCurrentUser } from '../../redux/user/selectors';
import LogoutButton from '../logout/logout';
import CartIcon from '../cartIcon/cartIcon';
import CartDropdown from '../cartDropdown/cartDropdown';


import './header.scss';
const LinksNoAuth = ({hidden}) => (
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
    {currentUser ? <LinksWithAuth hidden={hidden} loggedUser={currentUser} /> : <LinksNoAuth hidden={hidden} />}
  </div>
);

const mapStateToProps = createStructuredSelector({
  hidden: selectCartHidden,
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(withRouter(Header));